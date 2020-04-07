const {user} = require('./init-data')

module.exports = (sequelize) => sequelize.define('user', user)
