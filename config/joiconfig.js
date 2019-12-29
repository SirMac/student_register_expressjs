const Joi = require('joi')

exports.joiValidate = (req,res) => {

 const schema = Joi.object().keys({
   name: Joi.string().min(3).max(15).required(),
   course: Joi.string().min(3).max(15).required(),
   level: Joi.string().min(3).required(),
   gender: Joi.string().min(3).max(15).required(),
   club: Joi.string().min(3).max(15).required(),
   stdtype: Joi.string().min(3).max(15).required()
})

  Joi.validate(req.body, schema, (err,result)=>{
      if(err){
         console.log(err.details[0].message)
         req.session.sdata = err.details[0].message
         req.session.joiresult = false
         
      }
      else{
         req.session.joiresult = true
         console.log('Joi Validation Successful')
      }
   })
}