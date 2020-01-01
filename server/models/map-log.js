module.exports = (sequelize, Sequelize) => sequelize.define('mapLog', {
  turn: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  playersJson: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  cellsJson: {
    type: Sequelize.TEXT,
    defaultValue: ''
  }
})
