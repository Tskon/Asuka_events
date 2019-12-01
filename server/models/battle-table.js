module.exports = function (sequelize, Sequelize) {
  const BattleTable = sequelize.define('battleTable', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    turnNumber: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    cellId: {
      type: Sequelize.CHAR(4),
      defaultValue: '',
    },

    finalist1Screen: {
      type: Sequelize.STRING,
      defaultValue: '',
    },

    finalist2Screen: {
      type: Sequelize.STRING,
      defaultValue: '',
    },

    winnerScreen: {
      type: Sequelize.STRING,
      defaultValue: '',
    },
  })

  return BattleTable
}
