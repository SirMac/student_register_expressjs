const schemas = require('./orm_model')


class SequelizeORM{

    getSchema(table){
        for (const schema in schemas) {
            if( schema.toLowerCase() == table.toLowerCase()){
                return schemas[schema]()
            }
        }
        return null
    }

    db(table){
        let db = this.getSchema(table)
        if(!db) return {'error':'Table not found'}
        return db
    }

    execute(operation){
        try {
            return operation
        } catch (error) {
            return {'error':error.message}
        }
    }

    add(table, data){
        if(!data) return {'error': 'data must be provided'}
        return this.execute(this.db(table).create(data))
    }

    select(table, whereClause={}){
        return this.execute(this.db(table).findAll(whereClause))
    }

    update(table, data, id){
        if(!data || !id) return {'error': 'data and id must be provided'}
        return this.execute(this.db(table).update(data, {where:{id}}))
    }

    delete(table, id){
        if(!data || !id) return {'error': 'data and id must be provided'}
        return this.execute(this.db(table).destroy({where:{id}}))
    }
}


module.exports = new SequelizeORM()