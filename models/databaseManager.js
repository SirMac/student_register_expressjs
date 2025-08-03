const sequelizeDB = require('./sequelizeORM')
const db = sequelizeDB

class DatabaseManager{

    add(table, data){
        return db.add(table, data)
    }

    select(table, whereClause={}){
        return db.select(table, whereClause)
    }

    update(table, data, id){
        return db.update(table, data, id)
    }

    delete(table, id){
        return db.delete(table, id)
    }
}


module.exports = new DatabaseManager()