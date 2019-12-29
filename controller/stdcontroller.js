
//===========Add New Student=============================
exports.addstudent_index = (req,res)=>{
   res.render('addstudent.ejs', {title:'Add New Student',nvbrand:'Add New Student', 
   rlink:'active',nlink:'',llink:'',success:req.session.sdata,sdata:[] })
   sdata=''
}

exports.addstudent_create = (req,res)=>{
   const joiconfig = require('../config/joiconfig')
   joiconfig.joiValidate(req,res)
   if(req.session.joiresult){
      const {img} = req.files
      if(img.size <  200000 && (img.mimetype === 'image/jpeg' || img.mimetype === 'image/png')){
         const conn = require('../config/sqldb')
         let imgfile = img
         let uploadpath = './static/uploads/' + imgfile.name
         const {name,course,level,gender,club,stdtype} = req.body
         let q = "INSERT INTO `students` (name, course, level, gender,club,stdtype,img) VALUES ('"+name+"', '"+course+"', '"+level+"', '"+gender+"', '"+club+"', '"+stdtype+"', '"+imgfile.name+"')"    
         conn.query(q, err=>{
            if(err){
               req.session.sdata = 'Add Student not successful'
               console.log(`Add Student not successful: ${err.code} [${err.sqlMessage}]`)              
               res.redirect('/students/addstudent')
            }
            else{
               imgfile.mv(uploadpath, er=>{
                  return er ? console.log(er) : ''
               })
               req.session.msg = `Student With Name ${name} Added Successfully`
               res.redirect('/')}
      })
      }
      
      else{
         sdata = 'Image Size Must Be < 200KB And Must Be jpg or png'
         res.redirect('/students/addstudent')
      } 
      
   }
   else{res.redirect('/students/addstudent')}
}


//=========== Delete Student =======================
exports.deletestudent = (req,res)=>{
   const conn = require('../config/sqldb')
    let q = "DELETE FROM `students` WHERE sid='"+req.params.id+"' "
    conn.query(q, err=>{
      if(err){
         req.session.msg = `Delete Student With ID ${req.params.id} NOT Successful`
         console.log(`Delete Student NOT Successful: ${err.code} [${err.sqlMessage}]`)
         res.redirect('/')
      }
      else{
         req.session.msg = `Student With ID ${req.params.id} Deleted Successfully`
         console.log('Delete Student Successful')
         res.redirect('/')}
    })
}

//==============Edit Student ======================
exports.editstudent_index = (req,res)=>{
   const conn = require('../config/sqldb')   
   let q = "SELECT * FROM `students` WHERE sid='"+req.params.id+"' "
   conn.query(q, (err,result)=>{
   if(err){
      req.session.sdata = 'Edit Student: DB Query not successful'
      console.log(`Edit Student: DB Query not successful ${err.code} [${err.sqlMessage}]`)
      res.render('editstudent.ejs',{title:'Edit Student Detail',nvbrand:'Edit Student Detail', 
      rlink:'active',nlink:'',llink:'',success:req.session.sdata,edata:[]})
   }
   else{
      console.log('Edit Student: DB Query Successful')
      res.render('editstudent.ejs',{title:'Edit Student Detail',nvbrand:'Edit Student Detail', 
      rlink:'active',nlink:'',llink:'',success:req.session.sdata,edata:result[0]})
   }
   })
}


exports.editstudent_update = (req,res)=>{
   const joiconfig = require('../config/joiconfig')
   joiconfig.joiValidate(req,res)
   if(req.session.joiresult){
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
                   req.session.sdata = 'DB update not successful. Check DB Connection'
                   console.log(`Edit Student: DB Update not successful: ${err.code} [${err.sqlMessage}]`)
                   res.redirect(req.originalUrl)
               }
               else{
                  req.session.msg = `${name} Details Editted Successfully`
                   console.log('Edit Student: DB Update Successful')
                   imgfile.mv(uploadpath, er=>{
                       return er ? console.log(er) : ''
                   })
                   res.redirect('/')
               }
           })
       }
       else{
           req.session.sdata = 'Image Size Must Be < 200KB And Must Be jpg or png'
           res.redirect(req.originalUrl)
       } 
}

   else{
       const {name,course,level,gender,club,stdtype} = req.body
       const conn = require('../config/sqldb')
       let date = new Date().toJSON().slice(0,19).replace('T',' ')
       let q = "UPDATE `students` SET name='"+name+"', course='"+course+"', level='"+level+"', gender='"+gender+"', club='"+club+"', stdtype='"+stdtype+"', date='"+date+"' WHERE sid='"+req.params.id+"' "
       conn.query(q, err=>{
           if(err){
               req.session.sdata = 'DB update not successful. Check DB Connection'
               console.log(`Edit Student: DB Update not successful: ${err.code} [${err.sqlMessage}]`)
               res.redirect(req.originalUrl)
           }
           else{
               req.session.msg = `${name} Details Editted Successfully`
               console.log('Edit Student: DB Update Successful')
               res.redirect('/')
           }
       })
   }
}
else{
   //Joi Validation Fails
   res.redirect(req.originalUrl)
} 
}