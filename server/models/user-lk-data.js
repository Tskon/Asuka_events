const {userLkData} = require('./init-data')

module.exports = (sequelize) => sequelize.define('userLkData', userLkData)
