// const shortid = require("shortid")
const { error } = require("../utils/errorHandler")




class CommonService {

  generateId() {
    return Math.floor(Math.random() + 40)
    // return shortid.generate()
  }

  jsonParse(data) {
    try {
      return JSON.parse(data)
    }
    catch (err) {
      error(err)
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

}


module.exports = new CommonService()