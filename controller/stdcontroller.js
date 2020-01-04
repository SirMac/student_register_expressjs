const uploadfile = require('../config/fileUpload')
const conn = require('../config/sqldb')

//===========Add New Student=============================
exports.addstudent_index = (req,res)=>{
   res.render('addstudent.ejs', {title:'Add New Student',nvbrand:'Add New Student', 
   rlink:'active',nlink:'',llink:'',sdata:[] })
}

exports.addstudent_create = (req,res)=>{
   const sqlmodel = require('../models/sqlmodel')
   sqlmodel.addstd_query(req,res)
}


//=========== Delete Student =======================
exports.deletestudent = (req,res)=>{
    let q = "DELETE FROM `students` WHERE sid='"+req.params.id+"' "
    conn.query(q, err=>{
      if(err){
         req.flash('error_msg', `Delete Student With ID ${req.params.id} NOT Successful`)
         console.log(`Delete Student NOT Successful: ${err.code} [${err.sqlMessage}]`)        
         res.redirect('/')
      }
      else{
         req.flash('success_msg', `Student With ID ${req.params.id} Deleted Successfully`)
         console.log('Delete Student Successful')
         uploadfile.imgdelete(req,res)
         res.redirect('/')}
    })
}

//==============Edit Student ======================
exports.editstudent_index = (req,res)=>{
   let a 
   let q = "SELECT * FROM `students` WHERE sid='"+req.params.id+"' "
   conn.query(q, (err,result)=>{
   if(err){
      req.flash('error_msg', 'Edit Student not successful')
      console.log(`Edit Student: DB Query not successful ${err.code} [${err.sqlMessage}]`)
      res.render('editstudent.ejs',{title:'Edit Student Detail',nvbrand:'Edit Student Detail', 
      rlink:'active',nlink:'',llink:'',edata:[]})
   }
   else{
      if(result.length>0){
         console.log('Edit Student: DB Query Successful')
         res.render('editstudent.ejs',{title:'Edit Student Detail',nvbrand:'Edit Student Detail', 
         rlink:'active',nlink:'',llink:'',edata:result[0]})
      }
      else{res.redirect('/')}
   }
   })
   
}


exports.editstudent_update = (req,res)=>{
   let date = new Date().toJSON().slice(0,19).replace('T',' ')
   const {name,course,level,gender,club,stdtype} = req.body
   
   if(req.files!==null && req.files!==undefined){
      let q = "UPDATE `students` SET name='"+name+"', course='"+course+"', level='"+level+"', gender='"+gender+"', club='"+club+"', stdtype='"+stdtype+"', img='"+req.files.img.name+"', date='"+date+"' WHERE sid='"+req.params.id+"' "
         conn.query(q, err=>{
            if(err){
               req.flash('error_msg', 'Student detail update not successful')
               console.log(`Edit Student: DB Update not successful: ${err.code} [${err.sqlMessage}]`)
               res.redirect(req.originalUrl)
            }
            else{
               req.flash('success_msg', `"${name}" Details Editted Successfully`)
               console.log('Edit Student: DB Update Successful')
               uploadfile.imgupload(req,res)
               res.redirect('/')
            }
         })      
}

   else{
       let q = "UPDATE `students` SET name='"+name+"', course='"+course+"', level='"+level+"', gender='"+gender+"', club='"+club+"', stdtype='"+stdtype+"', date='"+date+"' WHERE sid='"+req.params.id+"' "
       conn.query(q, err=>{
           if(err){
               req.flash('error_msg', 'Student detail update not successful')
               console.log(`Edit Student: DB Update not successful: ${err.code} [${err.sqlMessage}]`)
               res.redirect(req.originalUrl)
           }
           else{
               req.flash('success_msg', `"${name}" Details Editted Successfully`)
               console.log('Edit Student: DB Update Successful')
               res.redirect('/')
           }
       })
   }

}