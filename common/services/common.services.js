const shortid = require("shortid")
const { error } = require("../utils/errorHandler")




class CommonService {

  generateId() {
    return shortid.generate()
  }

  jsonParse(data) {
    try {
      return JSON.parse(data)
    }
    catch (err) {
      error(`commonService.jsonParse ${err.message}`)
      return null
    }
  }

  parseUser(user) {
    if (!user || typeof user !== 'object') return null
    return {
      username: user.username,
      jobrole: user.jobrole,
      permissionFlag: user.permissionFlag
    }
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

    if(messageLength == 1 && messageList.indexOf('=') == -1) {
      parsedMessage.message = messageList
      return parsedMessage
    }

    for (const messageItem of messageList) {
      const [key, value] = messageItem.trim().split('=')
      parsedMessage[key.trim()] = value.trim()
    }

    return parsedMessage
  }


  parseErrorStack(err, stackLength=2) {
    if(!err || !err.stack) return
    const errorStack = err.stack.split(' at ')
    let errorDetail = ''
    for (let i = 0; i < stackLength; i++) {
      if(i >= errorStack.length) return
      errorDetail && (errorDetail += ' at ')
      errorDetail += `${errorStack[i].trim()}`
    }
    return errorDetail
  }

}


module.exports = new CommonService()