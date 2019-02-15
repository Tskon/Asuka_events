const Sequelize = require('sequelize')
const dbConfig = require('./db-config')

sequelize = new Sequelize(dbConfig.dbName, dbConfig.dbUser, dbConfig.dbPassword, dbConfig.dbOptions)

module.exports = sequelize
// sequelize
//   .authenticate()
//   .then(()=>{
//     console.log('All right! connection success')
//   })
//   .catch(err=>{
//     console.error(new Date(),'error from sequelize', err)
//   })
