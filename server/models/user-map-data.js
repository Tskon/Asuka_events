module.exports = function (sequelize, Sequelize) {
  const UserMapData = sequelize.define('userMapData', {
    userId: {
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    score: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    selectedCellId: {
      type: Sequelize.CHAR(4),
      defaultValue: '',
    },
  })

  return UserMapData
}
