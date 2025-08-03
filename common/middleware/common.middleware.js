const { getCookieValue } = require("../../auth/services/auth.services")
const { logoutUser } = require("../../users/controller/users.controller")
const { getUserByUsername } = require("../../users/services/users.dao")
const { parseUser } = require("../services/common.services")
const { error } = require("../utils/errorHandler")

class CommonMiddleware {

    cookieParser(req, res, next) {
        const cookies = req.headers['cookie']
        req.cookies = cookies
        return next()
    }

    async parseSystemUser(req, res, next) {
        const cookies = req.cookies
        const username = getCookieValue(cookies, 'username')
        if (!username) return next()

        const user = await getUserByUsername(username)

        const message = `common.middleware.parseSystemUser: Invalid username ${username}`

        if (!user) {
            error(message)
            return logoutUser(req, res)
        }

        req.user = parseUser(user)

        return next()
    }

}


module.exports = new CommonMiddleware()


