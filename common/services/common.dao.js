const { PrismaClient } = require('@prisma/client')
const { error, info } = require('../utils/errorHandler')

class CommonDao {

  async addNewRecord(record, options) {
      const prisma = new PrismaClient()

      if (typeof record !== 'object') {
        error('data must be an object')
        return null
      }
  
      const tableName = options.tableName
  
      if (!tableName) { //check if it is system table
        error('valid table name must be provided')
        return null
      }
  
      try {
        await prisma[tableName].create({data: record})
        info(`${tableName} with id, "${record.id}" created succesfully`)
        return record.id
      }
      catch (err) {
        error(err)
        return null
      }
  
    }
}


module.exports = new CommonDao()