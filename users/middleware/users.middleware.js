const { badRequest } = require('../../common/constants/errors')
const { throwError } = require('../../common/utils/errorHandler')
const {validateLoginData, validateNewUser} = require('../services/users.validation')

class UserMiddleware {
    
    async validateUser(req, res, next){
        let validationData = validateLoginData(req.body)
        throwError(
            !validationData.error,
            badRequest.status,
            'Username/password validation failed',
            'loginValidationError'
        )
        return next()
    }

    async validateNewUser(req, res, next){
        let newUser = req.body
        let userValidation = validateNewUser(newUser)
        throwError(
            !userValidation.error,
            badRequest.status,
            'New user validation failed',
            'signupValidationError'
        )
        return next()
    }
}

module.exports = new UserMiddleware()