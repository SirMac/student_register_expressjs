const express = require('express')
const route = express.Router()
const db = require('../models/orm_model').schema()
const logger = require('../config/err_logger')

route.get('/', (req,res)=>{
    db.findAll().then(result=>{
        res.render('index.ejs', {title:'Home',nvbrand:'Student Register', 
        nlink:'active',rlink:'',llink:'',sdata:result})
    }).catch(e=> logger.log('error',`'Sequalize DB Query Error' ${e}`)) 
}) 

module.exports = route