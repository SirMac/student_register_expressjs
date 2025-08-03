
// const argon2 = require('argon2')
const Joi = require('joi')

class UserValidation {

    validateLoginData(loginData){
        const userSchema = Joi.object({
            email: Joi.string().email().min(3).max(30).required(),
            password: Joi.string().min(3).max(15).required()
        })

       return userSchema.validate(loginData)
    }

    validateNewUser(newUser){
        const userSchema = Joi.object({
            firstname: Joi.string().alphanum().min(3).max(30).required(),
            lastname: Joi.string().alphanum().min(3).max(30).required(),
            username: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email({minDomainSegments:2}),
            password: Joi.string().min(3).max(15).required(),
            jobroleid: Joi.any(),
            userstatusid: Joi.any(),
        })

       return userSchema.validate(newUser)
    }
}

module.exports = new UserValidation()