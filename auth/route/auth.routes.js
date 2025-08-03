const authController = require('../controllers/auth.controller')
const jwtMiddleware = require('../middleware/jwt.middleware')


class AuthRoutes {
    constructor(app) {
        this.app = app
        this.configureRoutes()
    }

    configureRoutes() {
        this.app.post(`/auth`, [
            authController.createNewJWT,
        ]);

        this.app.post(`/auth/refresh-token`, [
            jwtMiddleware.validRefreshNeeded,
            authController.createNewJWT,
        ]);

        this.app.post(`/has-page-access`, [
            jwtMiddleware.validJWTNeeded,
            authController.handlePageAccess,
        ]);

        this.app.post(`/isloggedin`, [
            jwtMiddleware.validJWTNeeded,
            authController.isLoggedIn,
        ]);
        
        return this.app;
    }
}
module.exports = AuthRoutes

