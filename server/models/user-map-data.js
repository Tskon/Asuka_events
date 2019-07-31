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

    ceilId: {
      type: Sequelize.STRING,
      defaultValue: '',
    },
  })

  return UserMapData
}
