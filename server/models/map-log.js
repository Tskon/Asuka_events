const {mapLog} = require('./init-data')

module.exports = (sequelize) => sequelize.define('mapLog', mapLog)
