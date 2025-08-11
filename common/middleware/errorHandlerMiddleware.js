const httpErrors = require('http-errors')
const { error } = require('../utils/errorHandler')
const { jsonParse } = require('../services/common.services')
const { sendErrorResponse } = require('../utils/requestHandler')


class ErrorHandlerMiddleware {
    constructor(app) {
        this.app = app
        this.configureMiddleware()
    }

    configureMiddleware() {
        const processEvents = [
            {
                'name': 'uncaughtException'
            },
             {
                'name': 'unhandledRejection'
            }
        ]

        for (const event of processEvents) {
            process.on(event.name, err => {
                error(err)
                process.exit(1)
            })
        }

        this.app.use((req, res, next) => {
            next(httpErrors(404, 'route not found error'))
        })

        this.app.use((err, req, res, next) => {

            if (!err.message) return next()

            const errorMessage = jsonParse(err.message)
            if (!errorMessage) {
                error(err)
                return sendErrorResponse(res)
            }

            const {
                httpStatusCode,
                message,
                appErrorCode
            } = errorMessage

            error(err)
            sendErrorResponse(res, httpStatusCode, { message, errorCode: appErrorCode })

        })

        return this.app
    }
}

module.exports = ErrorHandlerMiddleware