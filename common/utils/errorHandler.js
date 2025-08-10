const assert = require('node:assert')
const { logger } = require('../logger/logManager')


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
        if (!err) return
        return logger.error(this.parseErrorStack(err))
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


    parseErrorMessage(message) {
        const parsedMessage = {
            httpStatusCode: '',
            message: '',
            appErrorCode: ''
        }

        if (!message || typeof message !== 'string') return parsedMessage

        const messageList = message.trim().split('||')
        const messageLength = messageList.length

        // if (!messageLength) return parsedMessage

        if (messageLength == 1 && messageList.indexOf('=') == -1) {
            parsedMessage.message = messageList
            return parsedMessage
        }

        for (const messageItem of messageList) {
            const [key, value] = messageItem.trim().split('=')
            parsedMessage[key.trim()] = value.trim()
        }

        return parsedMessage
    }


    parseErrorStack(err, stackLength = 4) {
        if (!err) return
        if (!err.stack) return err
        const errorStack = err.stack.split(' at ')
        let errorDetail = '', stackIndex = 0
        while (stackIndex < stackLength){
            errorDetail && (errorDetail += ' at ')
            errorDetail += `${errorStack[stackIndex].trim()}`
            stackIndex++
        }
        return errorDetail
    }

}

module.exports = new AppError()


