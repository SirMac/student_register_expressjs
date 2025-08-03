// Joi validation Module. Use as middleware
// It includes file upload validation

const Joi = require('joi')
const logger = require('../config/err_logger')

exports.validate = (req, res, next) => {
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
   const { name, course, level, gender, club, stdtype } = req.body
   const dataToValidate = {
      name, course, level, gender, club, stdtype,
      mimetype: req.files ? req.files.img.mimetype : 'image/jpeg',
      size: req.files ? req.files.img.size : 10000
   }


   Joi.validate(dataToValidate, schema, err => {
      if (err) {
         err.details.map(e => console.log(e.message))
         if (err.details[0].message == '"mimetype" must be one of [image/jpeg, image/png]' ||
            err.details[0].message == '"size" must be less than or equal to 200000') {
            req.flash('error_msg', 'Image must be < 200KB and of type JPEG or PNG')
            logger.log('error', 'Image must be < 200KB and of type JPEG or PNG')
            res.redirect(req.originalUrl)
         }
         else {
            req.flash('error_msg', err.details[0].message)
            logger.log('error', err.details[0].message)
            res.redirect(req.originalUrl)
         }
      }

      else {
         logger.log('info', 'Joi Validation Successful')
         next()
      }
   })
}

exports.validateRegister = (req, res, next) => {
   const schema = Joi.object().keys({
      name: Joi.string().trim().min(3).max(30).required(),
      email: Joi.string().email().min(3).max(30).required(),
      address: Joi.string().min(3).required(),
      password: Joi.string().min(3).max(15).required()
   })

   //Create Object to validate so as to include Files
   const { name, email, address, password } = req.body
   const dataToValidate = { name, email, address, password }

   Joi.validate(dataToValidate, schema, (err, result) => {
      if (err) {
         req.flash('error_msg', err.details[0].message)
         logger.log('error', `Joi Validation Not Successful: ${err.details[0].message}`)
         res.redirect('/register')
      }

      else {
         logger.log('info', 'Joi Validation Successful')
         next()
      }
   })
}



exports.validateLogin = (req, res, next) => {
   const schema = Joi.object().keys({
      password: Joi.string().trim().min(3).max(15).required(),
      email: Joi.string().email().min(3).max(15).required()
   })

   //Create Object to validate
   const { password, email } = req.body
   const dataToValidate = { password, email }

   Joi.validate(dataToValidate, schema, (err, result) => {
      if (err) {
         req.flash('error_msg', err.details[0].message)
         logger.log('error', `Joi Validation Not Successful: ${err.details[0].message}`)
         res.redirect('/login')
      }

      else {
         logger.log('info', 'Joi Validation Successful')
         next()
      }
   })
}





exports.validateNewStudent = (req, res, next) => {
   const { name, course, level, gender, club, stdtype } = req.body
   const newStudent = {
      name, course, level, gender, club, stdtype,
      mimetype: req.files ? req.files.img.mimetype : 'image/jpeg',
      size: req.files ? req.files.img.size : 10000
   }
   const studentScheme = Joi.object({
      name: Joi.string().trim().min(3).max(30).required(),
      course: Joi.string().min(3).max(30).required(),
      level: Joi.string().min(3).required(),
      gender: Joi.string().min(3).max(30).required(),
      club: Joi.string().min(3).max(30).required(),
      stdtype: Joi.string().min(3).max(30).required(),
      mimetype: Joi.string().valid('image/jpeg').valid('image/png'),
      size: Joi.number().max(200000)
   })

   result = studentScheme.validate(newStudent)
   if(result.error){
      logger.error(`Student data validation error: ${result.error}`)
      return res.redirect('/students')
   }
   next()
}