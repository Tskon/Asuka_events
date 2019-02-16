const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const dbConfig = require('../database-worker/db-config')

const db = {}
const sequelize = new Sequelize(dbConfig.dbName, dbConfig.dbUser, dbConfig.dbPassword, dbConfig.dbOptions)

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0 && (file !== "index.js"))
  })
  .forEach(function(file) {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db)
  }
});

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
// sequelize
//   .authenticate()
//   .then(()=>{
//     console.log('All right! connection success')
//   })
//   .catch(err=>{
//     console.error(new Date(),'error from sequelize', err)
//   })
