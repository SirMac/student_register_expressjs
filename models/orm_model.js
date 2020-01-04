//Sequelize ORM setup for sql databases
//import to app: const db = require('../models/orm_model').schema()
//e.g. db.findAll().then(result=>{})
//Author: Mac. All rights reserved.

const {Sequelize, Model, DataTypes} = require('sequelize')
const dbconfig = require('../config/dbconfig.json')
const {username,password,database,host,dialect} = dbconfig.development
const sequelize = new Sequelize(database,username,password,{
   host, dialect,
   logging: false
})

exports.schema = ()=>{
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

//Execute once to create empty table with schema above
exports.syncSchema = () =>{
  this.schema()
  sequelize.sync({force: true}).then(()=>{
    console.log('Sequalize connection established')
 })
}