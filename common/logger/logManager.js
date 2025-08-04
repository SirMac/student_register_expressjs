const winstonLogger = require("./winstonLogger");

// const logger = winstonLogger.logger

class LogManager{

    constructor(){
        this.logger = winstonLogger.logger
    }

    info = (message) => {
        return this.logger.info(message)
    }

    error = (message) => {
        return this.logger.error(message)
    }

    log = (type, message) => {
        return this.logger.log(type, message)
    }
    
}


module.exports = new LogManager()