const passportAuth = require('./passportAuth/passport')


class AuthenticateUser{

    authenticate(req, res, next){
        passportAuth(req, res, next)
    }
}

module.exports = new AuthenticateUser()