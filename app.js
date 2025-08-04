const express = require('express')
const logger = require('./common/logger/logManager')

const UserRoutes = require('./users/route/users.routes')
const StudentRoutes = require('./students/route/students.routes')
const RouteMiddleware = require('./common/middleware/route.middleware')
const AppMiddleware = require('./common/middleware/app.middleware')

const app = express()

new AppMiddleware(app)

new UserRoutes(app)
new StudentRoutes(app)

new RouteMiddleware(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{logger.info('Listening on Port 3000')})
