const {userMapData} = require('./init-data')

module.exports = (sequelize) => sequelize.define('userMapData', userMapData)
