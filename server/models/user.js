module.exports = (sequelize, Sequelize) => sequelize.define('user', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  username: {
    type: Sequelize.TEXT
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false
  },

  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  isPlayer: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  secret: {
    type: Sequelize.STRING,
    defaultValue: ''
  }
})
