const express = require('express')
const student_router = express.Router()
const fileupload = require('express-fileupload')
const stdcontroller = require('../controller/std_controller')
const joivalidate = require('../config/joiconfig')

student_router.use(fileupload())

//=============Add Students======================
student_router.get('/addstudent', stdcontroller.addstudent_index)
student_router.post('/addstudent', joivalidate.validate, stdcontroller.addstudent_create)

//=========Delete Student==============
student_router.get('/delstudent/:id', stdcontroller.deletestudent) 

//============ Edit Student Details ==============
student_router.get('/editstudent/:id', stdcontroller.editstudent_index) 
student_router.post('/editstudent/:id', joivalidate.validate, stdcontroller.editstudent_update)

// Middleware to handle 404
student_router.use((req,res,next)=>{
   res.status(404).render('404.ejs')
   next()
})

module.exports = student_router