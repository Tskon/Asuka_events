const {mapCells} = require('./init-data')

module.exports = (sequelize) => sequelize.define('mapCell', mapCells)
