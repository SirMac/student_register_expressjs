const uploadfile = require('../config/fileUpload')
const logger = require('../config/err_logger')
const db = require('../models/databaseManager')

//=============Dashboard======================
exports.dashboard = async (req,res)=>{
   result = await db.select('student')
   if(result.error) {
      logger.error(`GetStudents: ${result.error}`)
   }
   res.render('index.ejs', { //check data avalilability on client side
      title:'Home',nvbrand:'Student Register', 
      nlink:'active',rlink:'',llink:'',sdata:result
   })
}
 
//===========Add New Student=============================
exports.addstudent_index = (req,res)=>{
   res.render('addstudent.ejs', {title:'Add New Student',nvbrand:'Add New Student', 
   rlink:'active',nlink:'',llink:'',sdata:[] })
}

exports.addstudent_create = async (req,res)=>{
   const {name,course,level,gender,club,stdtype} = req.body
   const {img} = req.files
   let student = {name,course,level,gender,club,stdtype,img:img.name}
   result = await db.add(student)

   if(result.error) {
      logger.error(`AddStudent: ${result.error}`)
      return res.redirect('/students')
   }

   req.flash('success_msg', `"${result.name}" Added Successfully`)
   logger.log('info',`${result.name} Added Successfully`)
   uploadfile.imgupload(img)
   res.redirect('/students')
   
}

//=========== Delete Student =======================
exports.deletestudent = async (req,res)=>{
   const result = await db.delete('student', req.params.id)

   if(result.error){
      logger.log('error',`Delete Student not Successful: ${result.error}`)
      return res.redirect('/students')
   }

   req.flash('success_msg', `Student With ID ${req.params.id} Deleted Successfully`)
   logger.log('info','Delete Student Successful')
   uploadfile.imgdelete(req.query.img)
   res.redirect('/students')

   // db.destroy({where:{id:req.params.id}}).then(() => {
   //    req.flash('success_msg', `Student With ID ${req.params.id} Deleted Successfully`)
   //    logger.log('info','Delete Student Successful')
   //    uploadfile.imgdelete(req.query.img)
   //    res.redirect('/students')
   // })
}

//==============Edit Student ======================
exports.editstudent_index = async (req,res)=>{
   const result = await db.select('student', {where:{id:req.params.id}})

    if(result.error){
      req.flash('error_msg', `That Resource Not Found !!!`)
      logger.log('error',`Edit Student page not found: ${result.error}`)
      return res.redirect('/students')
   }

   res.render('editstudent.ejs',{
      title:'Edit Student Detail',nvbrand:'Edit Student Detail', 
      rlink:'active',nlink:'',llink:'',edata:result[0]
   })
}

exports.editstudent_update = async (req,res)=>{
   const {name,course,level,gender,club,stdtype} = req.body
   //check if image is selected
   const _img = req.files ? req.files.img.name : req.query.img  
   const data = {name,course,level,gender,club,stdtype,img:_img}
   const result = await db.update('student', data, req.params.id)

   if(result.error){
      logger.log('error',`Edit Student not Successful: ${result.error}`)
      return res.redirect('/students')
   }

   req.flash('success_msg', `"${name}" Details Editted Successfully`)
   logger.log('info', `"${name}" Details Editted Successfully`)
   //don't upload if no image is selected 
   req.files ? (uploadfile.imgupload(req.files.img),
   uploadfile.imgdelete(req.query.img)): '' 
   res.redirect('/students')
}