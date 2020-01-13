const uploadfile = require('../config/fileUpload')
const db = require('../models/orm_model').schema()
const logger = require('../config/err_logger')

//=============Dashboard======================
exports.dashboard = (req,res)=>{
   db.findAll().then(result=>{
       res.render('index.ejs', {title:'Home',nvbrand:'Student Register', 
       nlink:'active',rlink:'',llink:'',sdata:result})
   }).catch(e=> logger.log('error',`'Sequalize DB Query Error' ${e}`)) 
}
 
//===========Add New Student=============================
exports.addstudent_index = (req,res)=>{
   res.render('addstudent.ejs', {title:'Add New Student',nvbrand:'Add New Student', 
   rlink:'active',nlink:'',llink:'',sdata:[] })
}

exports.addstudent_create = (req,res)=>{
   const {name,course,level,gender,club,stdtype} = req.body
   const {img} = req.files
   db.create({name,course,level,gender,club,stdtype,img:img.name}).then(s=>{
      req.flash('success_msg', `"${s.name}" Added Successfully`)
      logger.log('info',`${s.name} Added Successfully`)
      uploadfile.imgupload(img)
      res.redirect('/students')
   })
   
}

//=========== Delete Student =======================
exports.deletestudent = (req,res)=>{
   db.destroy({where:{id:req.params.id}}).then(() => {
      req.flash('success_msg', `Student With ID ${req.params.id} Deleted Successfully`)
      logger.log('info','Delete Student Successful')
      uploadfile.imgdelete(req.query.img)
      res.redirect('/students')
   })
}

//==============Edit Student ======================
exports.editstudent_index = (req,res)=>{
   db.findOne({where:{id:req.params.id}}).then((result)=>{
      if(result){
         res.render('editstudent.ejs',{title:'Edit Student Detail',nvbrand:'Edit Student Detail', 
         rlink:'active',nlink:'',llink:'',edata:result})
      }
      else{
         req.flash('error_msg', `That Resource Not Found !!!`)
         logger.log('error', `That Resource Not Found !!!`)
         res.redirect('/students')
      }
   })
}

exports.editstudent_update = (req,res)=>{
   const {name,course,level,gender,club,stdtype} = req.body
   //check if image is selected
   const _img = req.files ? req.files.img.name : req.query.img  
   db.update({name,course,level,gender,club,stdtype,img:_img},{where:{id:req.params.id}}).then((e)=>{
      req.flash('success_msg', `"${name}" Details Editted Successfully`)
      logger.log('info', `"${name}" Details Editted Successfully`)
      //don't upload if no image is selected 
      req.files ? (uploadfile.imgupload(req.files.img),
      uploadfile.imgdelete(req.query.img)): '' 
      res.redirect('/students')
   }).catch(()=>{
      logger.log('error','Edit Student not Successful')
      res.redirect('/students')
   })
}