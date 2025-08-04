const { createLogger, transports, format } = require('winston')
const path = require('path')


class Logger {

  constructor() {
    this.logger = this.winstonLogger()
  }

  winstonLogger() {
    const { combine, timestamp, printf, colorize } = format
    const printformat = printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`
    })
    
    const logger = createLogger({
      level: 'info',
      format: combine(timestamp(), printformat),
      _defaultMeta: { service: 'user-service' },
      transports: [
        new transports.File({ filename: `${__dirname}/logs/error.log`, level: 'error' }),
        new transports.File({ filename: `${__dirname}/logs/combined.log` })
      ],
    });

    if (process.env.NODE_ENV !== 'production') {
      logger.add(new transports.Console({
        format: colorize(),
      }));
    }

    return logger
  }

}

module.exports = new Logger()