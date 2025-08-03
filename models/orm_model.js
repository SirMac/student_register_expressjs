//Sequelize ORM setup for sql databases
//import to app: const db = require('../models/orm_model').schema()
//e.g. db.findAll().then(result=>{})
//Author: Mac. All rights reserved.
const logger = require('../config/err_logger')
const {Sequelize, DataTypes} = require('sequelize')
const dbconfig = require('./dbconfig.json')
const {username,password,database,host,dialect} = dbconfig.development_pg
const sequelize = new Sequelize(database,username,password,{
   host, dialect,
   logging: false
})

exports.student = ()=>{
  let student = sequelize.define("stdregister",{
    name: DataTypes.STRING,
    course: DataTypes.STRING,
    level: DataTypes.STRING,
    gender: DataTypes.STRING,
    club: DataTypes.STRING,
    stdtype: DataTypes.STRING,
    img: DataTypes.STRING,
  })
  
 return student
}


exports.users = ()=>{
  let users = sequelize.define("users",{
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
  })
  
 return users
}

exports.users_schema = ()=>{
  let users = sequelize.define("users",{
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
  })
  
 return users
}

//Execute once to create empty table with schema above
exports.syncSchema = () =>{
  this.schema()
  sequelize.sync({force: true}).then(()=>{
    logger.log('info','Sequalize connection established')
 })
}