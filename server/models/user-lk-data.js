module.exports = function (sequelize, Sequelize) {
  const UserLkData = sequelize.define('userLkData', {
    user_id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    clanTag: {
      type: Sequelize.TEXT,
      defaultValue: 'UNKWN',
    },

    clanName: {
      type: Sequelize.STRING,
      defaultValue: 'Unknown clan',
    },

    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: false,
    },
  })

  return UserLkData
}
