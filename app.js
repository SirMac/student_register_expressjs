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
    cookie:{maxAge:5000}
}))


app.use('/', require('./routes/index'))
app.use('/students', require('./routes/students'))

app.use((req,res,next)=>{
    res.status(404).send('Page Not Found')
    // next()
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{console.log('Listening on Port 3000')})
