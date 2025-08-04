const LocalStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
// const db = require('../../../models/orm_model').users_schema()
const db = require('../../../models/databaseManager')
const logger = require('../../../common/logger/logManager')
const bcrypt = require('../../../common/utils/encrypt')


exports.handleAuthentication = function(passport) {
  passport.use(
    new LocalStrategy({usernameField:'email'}, async (email,password,done) => {
      const result = await db.select('users', {where:{email}})
      
      if(result.error){
        logger.log('error', `Authetication-error: ${result.error}`)
        return done(null, false, { message: `Authetication-error: ${result.error}` })
      }

      const user = result[0]

      let isPasswordSame = await bcrypt.compare(password, user.password)

      if(isPasswordSame && email == user.email){
        logger.log('info','Successfully Logged-In: ')
        return done(null, user.name, { message: 'Login Successful' })
      }

      logger.log('error',`Email / Password not correct`)
      done(null, false, { message: 'Email / Password not correct' })
    
  }))  

    passport.serializeUser(function(email, done) {
      done(null, email);
    })

    passport.deserializeUser(function(user, done) {
      done(null, user)
    });  
}


//======Login Access Control=======
  exports.notLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    logger.log('error','Please log in to view that resource') 
    req.flash('error_msg','Please log in to view that resource') 
    res.redirect('/login');
  }

//======When Logged-In, Access to Login & Register page not allowed=======
  exports.loggedIn = function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/students');       
  }
