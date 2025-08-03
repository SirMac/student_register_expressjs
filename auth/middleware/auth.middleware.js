const {encryptPassword} = require('../services/auth.services')
const {validateLoginData, validateNewUser} = require('../../accounts/services/accounts.validation')

class AuthMiddleware {
    
    hasInventoryAccess(req, res, next){
        const permissionFlag = req.user.permissionFlag
        if(permissionFlag && 1) next()
        return res.send({status:'failed', msg:'Permission denied'})
    }
}

module.exports = new AuthMiddleware()