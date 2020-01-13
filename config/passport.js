const LocalStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
const db = require('../models/orm_model').users_schema()
const logger = require('../config/err_logger')


exports.passportAuth = function(passport) {
  passport.use(new LocalStrategy({usernameField:'email'},(email,password,done)=>{
    db.findOne({where:{email}}).then(result=>{
      if(result && email===result.email){
      bcryptjs.compare(password, result.password, function(hasherr, res) {
        if(hasherr){logger.log('error',`Password hash error occured: ${hasherr}`)}
        else if(res==true){
          logger.log('info','Successfully Logged-In: ')
          return done(null, result.name, { message: 'Login Successful' })
        }
        else{ 
          logger.log('error',`Password not correct`)
          return done(null, false, { message: 'Wrong Password' })
        }
      })
    }
    else {
      logger.log('error',`Email not registered`)
      return done(null, false, { message: 'Email not registered' })
    }
    }).catch((e)=>{
      logger.log('error',`Sequelize Connection Refused Error: ${e.parent.code}`)
      return done(null, false, { message: 'Error: Sequelize DB Connection Refused' })
    })
    
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
