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

// TODO исправить. Ошибка при создании таблиц без фикса
//  + Unhandled rejection SequelizeEagerLoadingError: mapCell is not associated to userMapData!
setTimeout(() => {
  db.userMapData.hasOne(db.mapCell, {foreignKey: 'cellName', sourceKey: 'cellId'})
  db.userMapData.hasOne(db.userLkData, {foreignKey: 'userId', sourceKey: 'userId'})
}, 1000)


module.exports = db
