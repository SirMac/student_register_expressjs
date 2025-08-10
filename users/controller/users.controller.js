const { register } = require('../services/users.services')
const { authenticate } = require('../../auth/services/authenticate')
const { info } = require('../../common/utils/errorHandler')


class UserController {

    getLoginPage(req, res) {
        res.render('login.ejs', { title: 'Login' })
    }

    authenticateUser = (req, res, next) => {

        return authenticate(req, res, next)

    }

    getRegisterPage(req, res) {
        res.render('register.ejs', { title: 'Register' })
    }

    createUser = async (req, res) => {
        return register(req.body)
    }

    logoutUser(req, res) {
        info(`"${req.user}" Successfuly Logged-out`)
        req.logout();
        res.redirect('/login');
    }
}

module.exports = new UserController()