module.exports = function (router, models) {
  router.post('/event/get-battle-table-data', async (req, res) => {
    const turnsCount = await models.Log.countDocuments()

    const battleTable = await models.BattleTable.findOne({
      turnNumber: turnsCount + 1,
      cellName: req.body.cellName
    }, 'cellName players firstPair secondPair finalPair eventSlug')

    if (battleTable) {
      res.send({
        status: 'ok',
        data: {
          cellName: battleTable.cellName,
          players: battleTable.players,
          firstPair: battleTable.firstPair,
          secondPair: battleTable.secondPair,
          finalPair: battleTable.finalPair,
          eventSlug: battleTable.eventSlug
        }
      })
    } else {
      res.send({
        status: 'ok'
      })
    }
  })
}
