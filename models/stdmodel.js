
exports.create_student = (req,res) =>{
    let imgfile, uploadpath
        const conn = require('../config/sqldb')
        const {name,course,level,gender,club,stdtype} = req.body
        sdata = req.session
        imgfile = req.files.img
        uploadpath = './static/uploads/' + imgfile.name

    let q = "INSERT INTO `students` (name, course, level, gender,club,stdtype,img) VALUES ('"+name+"', '"+course+"', '"+level+"', '"+gender+"', '"+club+"', '"+stdtype+"', '"+imgfile.name+"')"
        conn.query(q, err=>{
            if(err){
                sdata = 'Add Student not successful'
                console.log(`Add Student not successful: ${err.code} [${err.sqlMessage}]`)              
                res.redirect('/students/addstudent')
            }
            else{
                imgfile.mv(uploadpath, er=>{
                    return er ? console.log(er) : ''
                })
                sdata = 'Add Student Successful'
                res.redirect('/students/addstudent')}
            })
}