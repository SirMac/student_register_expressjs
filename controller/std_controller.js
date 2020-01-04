const uploadfile = require('../config/fileUpload')
const db = require('../models/orm_model').schema()

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
      console.log(`${s.name} Created`)
      uploadfile.imgupload(img)
      res.redirect('/')
   })
   
}

//=========== Delete Student =======================
exports.deletestudent = (req,res)=>{
   db.destroy({where:{id:req.params.id}}).then(() => {
      req.flash('success_msg', `Student With ID ${req.params.id} Deleted Successfully`)
      console.log('Delete Student Successful')
      uploadfile.imgdelete(req.query.img)
      res.redirect('/')
   })
}

//==============Edit Student ======================
exports.editstudent_index = (req,res)=>{
   db.findOne({where:{id:req.params.id}}).then((result)=>{
      if(result){
         console.log('Edit Student: DB Query Successful')
         res.render('editstudent.ejs',{title:'Edit Student Detail',nvbrand:'Edit Student Detail', 
         rlink:'active',nlink:'',llink:'',edata:result})
      }
      else{
         req.flash('error_msg', `That Resource Not Found. Be Respponsible !!!`)
         res.redirect('/')
      }
   })
}

exports.editstudent_update = (req,res)=>{
   const {name,course,level,gender,club,stdtype} = req.body
   //check if image is selected
   const _img = req.files ? req.files.img.name : req.query.img  
   db.update({name,course,level,gender,club,stdtype,img:_img},{where:{id:req.params.id}}).then((e)=>{
      req.flash('success_msg', `"${name}" Details Editted Successfully`)
      console.log('Edit Student: DB Update Successful')
      //don't upload if no image is selected 
      req.files ? (uploadfile.imgupload(req.files.img),
      uploadfile.imgdelete(req.query.img)): '' 
      res.redirect('/')
   }).catch(()=>{
      console.log('Edit Student not Successful')
      res.redirect('/')
   })
}