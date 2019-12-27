const express = require('express')
const session = require('express-session')

const app = express()

app.set('view-engine', 'ejs')
app.use(express.static(__dirname+'/static'))
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret:'register success',
    resave: false,
    saveUninitialized: true, 
    cookie:{maxAge:60000}
}))


app.use('/', require('./routes/index'))
app.use('/students', require('./routes/students'))


app.listen(3000, ()=>{console.log('Listening on Port 3000')})
