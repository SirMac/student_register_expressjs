const express = require('express')
const route = express.Router()


route.get('/', (req,res)=>{

    const conn = require('../config/sqldb')
    q = "SELECT * FROM `students`"
    conn.query(q, (err,result)=>{
        if(err){
            console.log(`Error, Could Not Query Database: [${err}]`)
             res.render('index.ejs', {title:'Home',nvbrand:'Student Register', 
             nlink:'active',rlink:'',llink:'', sdata:[]})
        }
        else{
            // console.log('Search Successful: ',result)
            res.render('index.ejs', {title:'Home',nvbrand:'Student Register', 
            nlink:'active',rlink:'',llink:'',sdata:result,msg:req.session.msg})
            }
        conn.close
    }) 

    
})

module.exports = route