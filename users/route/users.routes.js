const {authenticateUser, getLoginPage, getRegisterPage, logoutUser, createUser} = require('../controller/users.controller')
const {validateUser, validateNewUser} = require('../middleware/users.middleware')

class UserRoutes {
    constructor(app){
        this.app = app
        this.configureRoutes()
    }

    configureRoutes(){

        this.app.route('/register').get(getRegisterPage)

        this.app.route('/register')
        .post(validateNewUser, createUser)

        this.app.route('/login').get(getLoginPage)

        this.app.route('/login')
        .post(validateUser, authenticateUser)

        this.app.route('/logout')
        .get(logoutUser)


        return this.app
    }
}

module.exports = UserRoutes