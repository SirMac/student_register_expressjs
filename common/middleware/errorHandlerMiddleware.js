const httpErrors = require('http-errors')
const { error } = require('../utils/errorHandler')
const { jsonParse, parseErrorStack } = require('../services/common.services')
const { sendErrorResponse } = require('../utils/requestHandler')


class ErrorHandlerMiddleware {
    constructor(app) {
        this.app = app
        this.configureMiddleware()
    }

    configureMiddleware() {

        process.on('uncaughtException', err => {
            error(`uncaughtException: ${parseErrorStack(err,3)}`)
            process.exit(1)
        })

        process.on('unhandledRejection', err => {
            error(`unhandledRejection: ${parseErrorStack(err,3)}`)
            process.exit(1)
            
        })

        this.app.use((req, res, next) => {
            next(httpErrors(404, 'route not found'))
        })

        this.app.use((err, req, res, next) => {

            if(!err.message) return next()
            
            const errorMessage = jsonParse(err.message)
            if(!errorMessage){
                const errorDetail = parseErrorStack(err, 2)
                error(`httpError: ${errorDetail}`)
                return sendErrorResponse(res)
            }

            const {
                httpStatusCode,
                message,
                appErrorCode
            } = errorMessage

            error(`httpError. ${req.headers?.origin}: ${err.stack ? parseErrorStack(err, 3) : message}`)
            sendErrorResponse(res, httpStatusCode, { message, errorCode: appErrorCode })
            
        })

        return this.app
    }
}

module.exports = ErrorHandlerMiddleware