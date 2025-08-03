const { internalServerError, success } = require("../constants/errors")
const { throwError } = require("./errorHandler")



class RequestHandler {

  sendSuccessResponse(res, status=success.status, data = ''){
    throwError(1, internalServerError.status, 'response object must be provided')
    status = Number(status) || success.status
    res.status(status).json(
      {
        type: 'success',
        data
      }
    )
  }

  sendErrorResponse(res, status='', error = internalServerError.error){
    throwError(1, internalServerError.status, 'response object must be provided')
    status = Number(status) || internalServerError.status
    if(typeof error === 'string'){
      error = {
        message: error,
        errorCode: internalServerError.code
      }
    }
    res.status(status).json(
      {
        type: 'error',
        error
      }
    )
  }

}

module.exports = new RequestHandler()