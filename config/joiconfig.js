const Joi = require('joi')

exports.joiValidate = (req,res) => {

 const schema = Joi.object().keys({
   name: Joi.string().trim().min(3).max(15).required(),
   course: Joi.string().min(3).max(15).required(),
   level: Joi.string().min(3).required(),
   gender: Joi.string().min(3).max(15).required(),
   club: Joi.string().min(3).max(15).required(),
   stdtype: Joi.string().min(3).max(15).required(),
   mimetype: Joi.string().valid('image/jpeg').valid('image/png'),
   size: Joi.number().max(200000)
})

//Create Object to validate so as to include Files
   const {name,course,level,gender,club,stdtype,files} = req.body
   const dataToValidate = {
      name,course,level,gender,club,stdtype,
      mimetype: files.img.mimetype,
      size: files.img.size
   }


  Joi.validate(dataToValidate, schema, (err,result)=>{
      if(err){
         console.log(err.details[0].message)
         if(err.details[0].message=='"mimetype" must be one of [image/jpeg, image/png]' ||
            err.details[0].message=='"size" must be less than or equal to 200000'){
            req.session.sdata = 'Image must be < 200KB and of type JPEG or PNG'
         }
         else{
            req.session.sdata = err.details[0].message
            req.session.joiresult = false
         }
      }
     
      else{
         req.session.joiresult = true
         console.log('Joi Validation Successful')
      }
   })
}