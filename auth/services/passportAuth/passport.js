const passport = require('passport')
const auth = require('./manageAuth')


let authenticate = (req, res, next) => {
    auth.handleAuthentication(passport)

    passport.authenticate('local', {
        successRedirect: '/students',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)

}

module.exports = authenticate