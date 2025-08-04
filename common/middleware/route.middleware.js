const logger = require('../logger/logManager')


class RouteMiddleware{

    constructor(app){
        this.app = app
        this.notFoundMiddleware()
        return this.app
    }

    notFoundMiddleware(){
        this.app.use((req,res,next)=>{
            logger.info(`Resource not found. Redirected to login. ${req.originalUrl}`)
            res.status(404).redirect('/login')
        })
    }

}

module.exports = RouteMiddleware