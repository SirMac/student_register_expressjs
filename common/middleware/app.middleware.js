const express = require('express')
const session = require('express-session')
const passport = require('passport')
const path = require('path');

const flash = require('connect-flash')
const { fileuploadMiddleware } = require('../utils/fileUpload')


class AppMiddleware {
    constructor(app) {
        this.app = app
        this.expressMiddleware()
        this.messageMiddleware()
        this.passportMiddleware()
        this.reventCachingMiddleware()
        fileuploadMiddleware(app)
        return this.app
    }

    expressMiddleware() {
        const appRoot = path.dirname(require.main.filename)
        this.app.set('view-engine', 'ejs')
        this.app.use(express.static(appRoot + '/views/static'))
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(session({
            secret: 'register success',
            resave: false,
            saveUninitialized: true
        }))
    }

    messageMiddleware() {
        this.app.use(flash())
        this.app.use((req, res, next) => {
            res.locals.error_msg = req.flash('error_msg')
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error = req.flash('error')
            next()
        })
    }

    passportMiddleware() {
        this.app.use(passport.initialize())
        this.app.use(passport.session())
    }

    reventCachingMiddleware() {
        this.app.use((req, res, next) => {
            res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            next();
        })
    }

}

module.exports = AppMiddleware