const { isHashValid, hashData } = require('../../common/services/common.crypto')
const db = require('../../models/databaseManager')
const bcrpyt = require('../../common/utils/encrypt')
const logger = require('../../common/logger/logManager')

class UserServices {

    async isPasswordValid(passwordHash, password) {
        return isHashValid(passwordHash, password)
    }

    hashPassword(password) {
        return hashData(password)
    }


    async register(data) {
        const { name, email, address, password } = data

        const result = await db.select('users', { where: { email } })

        if (result.length > 0) {
            req.flash('error_msg', 'Email Already Exist. Try with different email')
            logger.log('error', 'Email Already Exist. Try with different email')
            return res.redirect('/register')
        }

        const passwordHash = bcrpyt.hash(password)
        if (passwordHash.error) {
            return logger.log('error', `Password hash error occured: ${hasherr}`)
        }

        const user = db.add('users', { name, email, address, password: hash })
        if (user.error) {
            return logger.log('error', `User registration fail: ${user.error}`)
        }

        req.flash('success_msg', `"${name}" Registered Successfully`)
        logger.log('info', `"${name}" Registered Successfully`)
        res.redirect('/login')
       

        // bcryptjs.hash(password, 10, function (hasherr, hash) {
        //     if (hasherr) { logger.log('error', `Password hash error occured: ${hasherr}`) }
        //     else {
        //         db.create({ name, email, address, password: hash }).then(s => {
        //             req.flash('success_msg', `"${name}" Registered Successfully`)
        //             logger.log('info', `"${name}" Registered Successfully`)
        //             res.redirect('/login')
        //         })
        //     }
        // })
    }

}

module.exports = new UserServices()