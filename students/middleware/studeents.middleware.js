const { badRequest } = require('../../common/constants/errors')
const { throwError } = require('../../common/utils/errorHandler')


class StudentMiddleware {
    
    async validateStudent(req, res, next){
        let validationData = req.body
        throwError(
            !validationData.error,
            badRequest.status,
            'Username/password validation failed',
            'loginValidationError'
        )
        return next()
    }

}

module.exports = new StudentMiddleware()