module.exports = function (router, models) {
  router.post('/map/get-battle-table-data', async (req, res) => {
    const turnsCount = await models.Log.countDocuments()

    const battleTable = await models.BattleTable.findOne({
      turnNumber: turnsCount + 1,
      cellName: req.body.cellName
    })

    if (battleTable) {
      res.send({
        status: 'ok',
        data: battleTable
      })
    } else {
      res.send({
        status: 'ok'
      })
    }
  })
}
