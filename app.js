const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const logger = require('./config/err_logger')

const app = express()

app.set('view-engine', 'ejs')
app.use(express.static(__dirname+'/static'))
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

//====Prevent Caching After Logout======
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
})

// create and run db migrations
// require('./models/orm_model').syncSchema()

const passport_config = require('./config/passport')

app.use('/students', passport_config.notLoggedIn, require('./routes/students'))
app.use('/login', passport_config.loggedIn, require('./routes/login'))
app.use('/register', passport_config.loggedIn, require('./routes/register'))


//=====Logout===========
app.get('/logout', (req,res)=>{
  logger.log('info',`"${req.user}" Successfuly Logged-out`)
  req.logout();
  res.redirect('/login');
})

app.use((req,res,next)=>{
    // res.status(404).render('404.ejs')
    res.status(404).redirect('/login')
    // next()
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{console.log('Listening on Port 3000')})
