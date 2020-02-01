module.exports = function (router, models) {
  router.post('/map/get-battle-table-data', async (req, res) => {
    const mapLog = await models.mapLog.findAll({
      limit: 1,
      order: [['turn', 'DESC']],
      attributes: ['turn']
    })

    const turnNumber = (mapLog.length) ? mapLog[0].turn + 1 : 1

    const battleTable = await models.battleTable.findOne({
      where: {
        turnNumber,
        cellId: req.body.cellId
      }
    })

    if (battleTable) {
      res.send({
        status: 'ok',
        data: {
          ...JSON.parse(battleTable.dataJson)
        }
      })
    } else {
      res.send({
        status: 'ok'
      })
    }
  })
}
