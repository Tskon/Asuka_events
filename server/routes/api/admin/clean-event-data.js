const Sequelize = require('sequelize')

module.exports = function (router, models) {
  router.post('/admin/clean-event-data', async (req, res) => {
    models.mapCell.drop()
    models.battleTable.drop()
    models.mapLog.drop()
    models.mapTurnData.drop()
    models.userMapData.drop()

    models.mapCell.create({
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      cellName: {
        type: Sequelize.CHAR(4),
        defaultValue: 'a1'
      },

      dataJson: {
        type: Sequelize.TEXT,
        defaultValue: '{"connectedCells":[], "isStarted": false, "bonus":0, "controlledTurnsCount": 0, "players": [], "owner": null}'
      }
    })
    models.battleTable.create({
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
    models.mapLog.drop({
      turn: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playersJson: {
        type: Sequelize.TEXT,
        defaultValue: ''
      },
      cellsJson: {
        type: Sequelize.TEXT,
        defaultValue: ''
      }
    })
  })
}
