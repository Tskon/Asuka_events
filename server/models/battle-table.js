const {battleTable} = require('./init-data')

module.exports = (sequelize) => sequelize.define('battleTable', battleTable)
