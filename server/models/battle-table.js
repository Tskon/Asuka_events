module.exports = (sequelize, Sequelize) => sequelize.define('battleTable', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  turnNumber: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },

  cellId: {
    type: Sequelize.CHAR(4),
    defaultValue: ''
  },

  dataJson: {
    type: Sequelize.TEXT,
    defaultValue: `{
      "screenshots": {
        "finalist1": "",
        "finalist2": "",
        "winner": ""
      },
      "pair1": [],
      "pair2": [],
      "finalPair": [],
      "winner": ""
    }`
  }
})
