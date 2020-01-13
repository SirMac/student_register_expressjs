const express = require('express')
const register_route = express.Router()
const joyvalidate = require('../config/joiconfig')
const bcryptjs = require('bcryptjs')
const db = require('../models/orm_model').users_schema()
const logger = require('../config/err_logger')

register_route.get('/', (req,res)=>{
    res.render('register.ejs', {title:'Register'})
})


register_route.post('/', joyvalidate.validateRegister, (req,res)=>{
  const {name,email,address,password} = req.body
  db.findOne({where:{email}}).then((result)=>{
    if(result){
      req.flash('error_msg', 'Email Already Exist. Try with different email')
      logger.log('error','Email Already Exist. Try with different email')
      res.redirect('/register')
    }
    else{
      bcryptjs.hash(password, 10, function(hasherr, hash) {
        if(hasherr){logger.log('error',`Password hash error occured: ${hasherr}`)}
        else{
          db.create({name,email,address,password:hash}).then(s=>{
            req.flash('success_msg', `"${name}" Registered Successfully`)
            logger.log('info',`"${name}" Registered Successfully`)
            res.redirect('/login')
          })
        }
      })
    }
 }).catch((e)=>{
  req.flash('error_msg', 'Error: Sequelize Connection Refused')
  logger.log('error',`Sequelize Connection Refused Error: ${e.parent.code}`)
  res.redirect('/register')
})
})

module.exports = register_route