module.exports = function (router, models) {
  router.post('/map/get-battle-table-data', async (req, res) => {
    const turnsCount = await models.Log.countDocuments()

    const battleTable = await models.BattleTable.findOne({
      turnNumber: turnsCount + 1,
      cellName: req.body.cellName
    }, 'cellName players firstPair secondPair finalPair')

    if (battleTable) {
      res.send({
        status: 'ok',
        data: {
          cellNames: battleTable.cellNames,
          players: battleTable.players,
          firstPair: battleTable.firstPair,
          secondPair: battleTable.secondPair,
          finalPair: battleTable.finalPair
        }
      })
    } else {
      res.send({
        status: 'ok'
      })
    }
  })
}
