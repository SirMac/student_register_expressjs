const express = require('express')
const route = express.Router()
const passport = require('passport')
const joyvalidate = require('../config/joiconfig')
const passport_config = require('../config/passport')


route.get('/', (req,res)=>{
    res.render('login.ejs', {title:'Login'})
})

route.post('/', joyvalidate.validateLogin, (req,res,next)=>{passport.authenticate('local', {
    successRedirect: '/students',
    failureRedirect: '/login',
    failureFlash: true
  })(req,res,next)
})

passport_config.passportAuth(passport)


module.exports = route