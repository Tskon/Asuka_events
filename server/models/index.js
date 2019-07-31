const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const dbConfig = require('../db-config')

const db = {}
const sequelize = new Sequelize(
  dbConfig.dbName,
  dbConfig.dbUser,
  dbConfig.dbPassword,
  dbConfig.dbOptions
)

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0 && (file !== 'index.js')))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

db.userMapData.hasOne(db.mapCell, {foreignKey: 'cellName', sourceKey: 'ceilId'})
db.userMapData.hasOne(db.userLkData, {foreignKey: 'userId', sourceKey: 'userId'})

module.exports = db
