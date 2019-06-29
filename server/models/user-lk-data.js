module.exports = function (sequelize, Sequelize) {
  const UserLkData = sequelize.define('user_lk_data', {
    user_id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    clan_tag: {
      type: Sequelize.TEXT,
    },

    clan_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    image_url: {
      type: Sequelize.STRING,
      defaultValue: false,
    },
  })

  return UserLkData
}
