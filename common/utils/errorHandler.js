const assert = require('node:assert')
const { logger } = require('../logger/logger')
// const { parseErrorStack } = require('../services/common.services')


class AppError {

    createErrorObject = (httpStatusCode, message, appErrorCode) => {
        return {
            httpStatusCode,
            message,
            appErrorCode
        }
    }

    throwError = (
        condition,
        httpStatusCode = 500,
        message = 'An error occured',
        appErrorCode = ''
    ) => assert(
        condition,
        JSON.stringify(
            this.createErrorObject(httpStatusCode, message, appErrorCode)
        )
    )

    error = (err) => {
        if(!err) return
        if(!err.message) return logger.error(err)
            logger.log(err.message)
        // logger.error(parseErrorStack(err, 2))
    }

    info = (message) => {
        logger.info(message)
    }

    handleAsyncFnxError = asyncFnx => (req, res, next) => {
        const asyncFnxLength = asyncFnx?.length
        if (!asyncFnxLength || asyncFnxLength < 2) return

        if (asyncFnxLength === 3) {
            return Promise
                .resolve(asyncFnx(req, res, next))
                .catch(error => next(error))
        }

        return Promise
            .resolve(asyncFnx(req, res))
            .catch(error => next(error))
    }
}

module.exports = new AppError()


