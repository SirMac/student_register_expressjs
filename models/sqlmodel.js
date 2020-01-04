const conn = require('../config/sqldb')
const uploadfile = require('../config/fileUpload')

exports.addstd_query = (req,res) => {
   const {name,course,level,gender,club,stdtype} = req.body
      let q = "INSERT INTO `students` (name, course, level, gender,club,stdtype,img) VALUES ('"+name+"', '"+course+"', '"+level+"', '"+gender+"', '"+club+"', '"+stdtype+"', '"+req.files.img.name+"')"    
      conn.query(q, err=>{
         if(err){
            req.flash('error_msg', 'Add Student not successful')
            console.log(`Add Student not successful: ${err.code} [${err.sqlMessage}]`)              
            res.redirect('/students/addstudent')
         }
         else{
            uploadfile.imgupload(req,res)
            req.flash('success_msg', `"${name}" Added Successfully`)
            res.redirect('/')}
      })
   
}

