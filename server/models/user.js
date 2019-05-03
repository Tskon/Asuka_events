module.exports = function (sequelize, Sequelize) {
  const User = sequelize.define('user', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    username: {
      type: Sequelize.TEXT,
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    is_admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    is_player: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    secret: {
      type: Sequelize.STRING,
      defaultValue: '',
    },
  })

  return User
}
