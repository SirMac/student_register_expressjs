const bcryptjs = require('bcryptjs')
// const bcrypt = require('bcryptjs/dist/bcrypt')


exports.compare = async (item1, item2) => {
    try {
        const isSame = await bcryptjs.compare(item1, item2)
        return isSame  
    } catch (error) {
         console.log('Bcrypt-compare-error: ', error.message)
         return false
    }
}


exports.hash = async (item, salt=10) => {
    try {
        const hash = await bcryptjs.hash(item, salt)
        return hash
    } catch (error) {
        return {'error':error.message}
    }
}