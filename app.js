const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const logger = require('./common/logger/logManager')
const fileupload = require('express-fileupload')

const UserRoutes = require('./users/route/users.routes')
const StudentRoutes = require('./students/route/students.routes')

const app = express()

app.set('view-engine', 'ejs')
app.use(express.static(__dirname+'/views/static'))
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret:'register success',
    resave: false,
    saveUninitialized: true 
}))

app.use(flash())
app.use((req,res,next)=>{
  res.locals.error_msg = req.flash('error_msg')
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error = req.flash('error')
  next()
})

//==Initialize Passport and setup its Session
app.use(passport.initialize())
app.use(passport.session())
app.use(fileupload())

//====Prevent Caching After Logout======
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
})

// create and run db migrations
// require('./models/orm_model').syncSchema()

// const passport_config = require('./config/passport')
// app.use('/students', passport_config.notLoggedIn, require('./routes/students'))

new UserRoutes(app)
new StudentRoutes(app)

app.use((req,res,next)=>{
    logger.info(`Resource not found. Redirected to login. ${req.originalUrl}`)
    res.status(404).redirect('/login')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{logger.info('Listening on Port 3000')})
