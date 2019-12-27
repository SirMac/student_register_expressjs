const stdmodels = require('../models/stdmodel')
var sdata = ''

//===========Add New Student=============================
exports.addstudent_index = (req,res)=>{
    res.render('addstudent.ejs', {title:'Add New Student',nvbrand:'Add New Student', 
    rlink:'active',nlink:'',llink:'',success:sdata,sdata:[] })
    // sdata=''
}

exports.addstudent_create = (req,res)=>{
    const {img} = req.files

    if(img.size <  200000 && (img.mimetype === 'image/jpeg' || img.mimetype === 'image/png')){
        // let imgfile, uploadpath
        // const conn = require('../config/sqldb')
        // const {name,course,level,gender,club,stdtype} = req.body
        // sdata = req.session
        // imgfile = req.files.img
        // uploadpath = './static/uploads/' + imgfile.name

        // let q = "INSERT INTO `students` (name, course, level, gender,club,stdtype,img) VALUES ('"+name+"', '"+course+"', '"+level+"', '"+gender+"', '"+club+"', '"+stdtype+"', '"+imgfile.name+"')"
        // conn.query(q, err=>{
        //     if(err){
        //         sdata = 'Add Student not successful'
        //         console.log(`Add Student not successful: ${err.code} [${err.sqlMessage}]`)              
        //         res.redirect('/students/addstudent')
        //     }
        //     else{
        //         imgfile.mv(uploadpath, er=>{
        //             return er ? console.log(er) : ''
        //         })
        //         sdata = 'Add Student Successful'
        //         res.redirect('/students/addstudent')}
        // })
        stdmodels.create_student(req,res)
    }
    else{
        sdata = 'Image Size Must Be < 200KB And Must Be jpg or png'
        res.redirect('/students/addstudent')
    }  
}


//=========== Delete Student =======================
exports.deletestudent = (req,res)=>{
    const conn = require('../config/sqldb')
 
    let q = "DELETE FROM `students` WHERE sid='"+req.params.id+"' "
    conn.query(q, err=>{
        if(err){
            console.log('Delete Student NOT Successful: ',err)
            res.redirect('/')
        }
        else{
            console.log('Delete Student Successful')
            res.redirect('/')}
    })
}

//==============Edit Student ======================
exports.editstudent_index = (req,res)=>{
    const conn = require('../config/sqldb')
    sdata = ''
    let q = "SELECT * FROM `students` WHERE sid='"+req.params.id+"' "
    conn.query(q, (err,result)=>{
        if(err){
            console.log('Edit Student: DB Query not successful ',err)
            res.render('editstudent.ejs',{title:'Edit Student Detail',nvbrand:'Edit Student Detail', 
            rlink:'active',nlink:'',llink:'',success:sdata,sdata:[]})
        }
        else{
            console.log('Edit Student: DB Query Successful')
            res.render('editstudent.ejs',{title:'Edit Student Detail',nvbrand:'Edit Student Detail', 
            rlink:'active',nlink:'',llink:'',success:sdata,edata:result[0]})
        }
    })
}

exports.editstudent_update = (req,res)=>{
    if(req.files!==null && req.files!==undefined){
        const {img} = req.files
        if(img.size <  200000 && (img.mimetype === 'image/jpeg' || img.mimetype === 'image/png')){
            const {name,course,level,gender,club,stdtype} = req.body
            let imgfile, uploadpath
            imgfile = req.files.img
            uploadpath = './static/uploads/' + imgfile.name
            let date = new Date().toJSON().slice(0,19).replace('T',' ')
            const conn = require('../config/sqldb')
            let q = "UPDATE `students` SET name='"+name+"', course='"+course+"', level='"+level+"', gender='"+gender+"', club='"+club+"', stdtype='"+stdtype+"', img='"+imgfile.name+"', date='"+date+"' WHERE sid='"+req.params.id+"' "
            conn.query(q, err=>{
                if(err){
                    sdata = 'DB update not successful. Check DB Connection'
                    console.log(`Edit Student: DB Update not successful: ${err.code} [${err.sqlMessage}]`)
                    res.render('editstudent.ejs',{title:'Edit Student Detail',nvbrand:'Edit Student Detail', 
                    rlink:'active',nlink:'',llink:'',success:sdata,edata:req.body})
                }
                else{
                    console.log('Edit Student: DB Update Successful')
                    imgfile.mv(uploadpath, er=>{
                        return er ? console.log(er) : ''
                    })
                    res.redirect('/')
                }
            })
        }
        else{
            sdata = 'Image Size Must Be < 200KB And Must Be jpg or png'
            res.render('editstudent.ejs',{title:'Edit Student Detail',nvbrand:'Edit Student Detail', 
            rlink:'active',nlink:'',llink:'',success:sdata,edata:req.body})
        } 
}

    else{
        const {name,course,level,gender,club,stdtype} = req.body
        const conn = require('../config/sqldb')
        let date = new Date().toJSON().slice(0,19).replace('T',' ')
        let q = "UPDATE `students` SET name='"+name+"', course='"+course+"', level='"+level+"', gender='"+gender+"', club='"+club+"', stdtype='"+stdtype+"', date='"+date+"' WHERE sid='"+req.params.id+"' "
        conn.query(q, err=>{
            if(err){
                sdata = 'DB update not successful. Check DB Connection'
                console.log(`Edit Student: DB Update not successful: ${err.code} [${err.sqlMessage}]`)
                res.render('editstudent.ejs',{title:'Edit Student Detail',nvbrand:'Edit Student Detail', 
                rlink:'active',nlink:'',llink:'',success:sdata,edata:req.body})
            }
            else{
                console.log('Edit Student: DB Update Successful')
                res.redirect('/')
            }
        })
    }

}