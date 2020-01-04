const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')

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
app.use(flash())
app.use((req,res,next)=>{
    res.locals.error_msg = req.flash('error_msg')
    res.locals.success_msg = req.flash('success_msg')
    next()
})

app.use('/', require('./routes/index'))
app.use('/students', require('./routes/students'))

app.use((req,res,next)=>{
    res.status(404).render('404.ejs')
    // next()
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{console.log('Listening on Port 3000')})
