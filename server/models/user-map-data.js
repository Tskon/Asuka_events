module.exports = function (sequelize, Sequelize) {
  const UserMapData = sequelize.define('user_map_data', {
    user_id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    score: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    ceil_id: {
      type: Sequelize.STRING,
      defaultValue: '',
    },
  })

  return UserMapData
}
