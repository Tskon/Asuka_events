module.exports = (sequelize, Sequelize) => sequelize.define('userMapData', {
  userId: {
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },

  selectedCellId: {
    type: Sequelize.CHAR(4),
    defaultValue: ''
  }
})
