const express = require('express')
const logger = require('./common/logger/logManager')

const UserRoutes = require('./users/route/users.routes')
const StudentRoutes = require('./students/route/students.routes')
const AppMiddleware = require('./common/middleware/app.middleware')
const ErrorHandlerMiddleware = require('./common/middleware/errorHandlerMiddleware')

const app = express()

new AppMiddleware(app)

new UserRoutes(app)
new StudentRoutes(app)

new ErrorHandlerMiddleware(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{logger.info('Listening on Port 3000')})
