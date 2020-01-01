module.exports = (sequelize, Sequelize) => sequelize.define('mapTurnData', {
  turnNumber: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  turnName: {
    type: Sequelize.CHAR(20),
    defaultValue: ''
  },

  fog: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})
