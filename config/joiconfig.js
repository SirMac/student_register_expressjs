// Joi validation Module. Use as middleware
// It includes file upload validation

const Joi = require('joi')

exports.validate = (req,res,next) => {
 const schema = Joi.object().keys({
   name: Joi.string().trim().min(3).max(30).required(),
   course: Joi.string().min(3).max(30).required(),
   level: Joi.string().min(3).required(),
   gender: Joi.string().min(3).max(30).required(),
   club: Joi.string().min(3).max(30).required(),
   stdtype: Joi.string().min(3).max(30).required(),
   mimetype: Joi.string().valid('image/jpeg').valid('image/png'),
   size: Joi.number().max(200000)
})

//Create Object to validate
   const {name,course,level,gender,club,stdtype} = req.body
   const dataToValidate = {
      name,course,level,gender,club,stdtype,
      mimetype: req.files ? req.files.img.mimetype : 'image/jpeg',
      size: req.files ? req.files.img.size : 10000
   }


  Joi.validate(dataToValidate, schema, err=>{
      if(err){
         err.details.map(e=>console.log(e.message))
         if(err.details[0].message=='"mimetype" must be one of [image/jpeg, image/png]' ||
            err.details[0].message=='"size" must be less than or equal to 200000'){
            req.flash('error_msg', 'Image must be < 200KB and of type JPEG or PNG')
            res.redirect(req.originalUrl)
         }
         else{
            req.flash('error_msg', err.details[0].message)
            res.redirect(req.originalUrl)
         }
      }
     
      else{
         console.log('Joi Validation Successful')
         next()
      }
   })
}