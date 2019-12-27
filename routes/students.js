const express = require('express')
const student_router = express.Router()
const stdcontroller = require('../controller/stdcontroller')
const fileupload = require('express-fileupload')

student_router.use(fileupload())
//=============Add Students======================
student_router.get('/addstudent', stdcontroller.addstudent_index)
student_router.post('/addstudent', stdcontroller.addstudent_create)

//=========Delete Student==============
student_router.get('/delstudent/:id', stdcontroller.deletestudent) 

//============ Edit Student Details ==============
student_router.get('/editstudent/:id', stdcontroller.editstudent_index) 
student_router.post('/editstudent/:id', stdcontroller.editstudent_update) 


module.exports = student_router