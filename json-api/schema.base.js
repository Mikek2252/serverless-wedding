const environment = require('../environment.js')
const mysql = require('mysql')
const JSONAPI = require('./app')

module.exports = class Schema {
  constructor ({ type, attributes, relationships, boolean }) {
    this.connection = mysql.createConnection(environment)
    this.type = type
    this.attributes = attributes || []
    this.boolean = boolean || []
    this.relationships = relationships || []
  }
  defaultHandler (err, result) {
    console.log(err)
    console.log(result)
    if (err) this.res.json(err)
    const serialized = this.serialize(result)
    console.log(serialized)
    this.res.json(serialized)
    this.res = null
  }
  belongsToHandler (err, result) {
    if (err) this.res.json(err)
    result = result.length ? result[0] : result
    const serialized = this.serialize(result)
    this.res.json(serialized)
    this.res = null
  }
  serialize (data) {
    return JSONAPI(this, data)
  }
  query (query, handler = this.defaultHandler) {
    if (handler === 'belongsTo') handler = this.belongsToHandler
    const connection = this.connection
    return connection.query(query, handler.bind(this))
  }
  findAll (res, handler = this.defaultHandler) {
    this.res = res
    // TODO: consider not using type
    const query = `SELECT * FROM ${this.type}`
    return this.query(query, handler)
  }
  // TODO: probably a nicer way to do this
  findBy (key, value, res, handler) {
    this.res = res
    const escapedKey = this.connection.escape(key).split("'").join('')
    const escapedValue = this.connection.escape(value)
    const query = `SELECT * FROM ${this.type} WHERE ${escapedKey} = ${escapedValue}`
    return this.query(query, handler)
  }
}
