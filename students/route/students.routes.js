const {
    dashboard, 
    addStudentIndex, 
    addStudent, 
    deleteStudent, 
    editStudentIndex, 
    editStudent
} = require('../controller/student.controller')

const {notLoggedIn} = require('../../auth/services/passportAuth/manageAuth')


class StudentRoutes {
    constructor(app){
        this.app = app
        this.configureRoutes()
    }

    configureRoutes(){
        this.app.use(notLoggedIn)
        this.app.route(['/','/students']).get(dashboard)
        this.app.route('/students/addstudent').get(addStudentIndex)
        this.app.route('/students/addstudent').post(addStudent)
        this.app.route('/students/delstudent/:id').get(deleteStudent)
        this.app.route('/students/editstudent/:id').get(editStudentIndex)
        this.app.route('/students/editstudent/:id').post(editStudent)

        return this.app
    }
}

module.exports = StudentRoutes