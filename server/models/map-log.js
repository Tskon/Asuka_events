module.exports = function (sequelize, Sequelize) {
  const Map = sequelize.define('mapLog', {
    currentTurn: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    playersJson: {
      type: Sequelize.TEXT,
      defaultValue: '',
    },
    cellsJson: {
      type: Sequelize.TEXT,
      defaultValue: '',
    },
  })

  return Map
}
