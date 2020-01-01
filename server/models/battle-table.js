module.exports = (sequelize, Sequelize) => sequelize.define('battleTable', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  turnNumber: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },

  cellId: {
    type: Sequelize.CHAR(4),
    defaultValue: ''
  },

  finalist1Screen: {
    type: Sequelize.STRING,
    defaultValue: ''
  },

  finalist2Screen: {
    type: Sequelize.STRING,
    defaultValue: ''
  },

  winnerScreen: {
    type: Sequelize.STRING,
    defaultValue: ''
  }
})
