module.exports = function (router, models) {
  router.post('/map/get-battle-table-data', async (req, res) => {
    const [mapLog, mapCellsRaw] = await Promise.all([
      models.mapLog.findAll({
        limit: 1,
        order: [['turn', 'DESC']],
        attributes: ['turn']
      }),
      models.mapCell.findAll()
    ])

    const mapCells = mapCellsRaw.map(cell => {
      return {
        cellName: cell.cellName,
        ...JSON.parse(cell.dataJson)
      }
    })
    const currentCell = mapCells.find(cell => cell.players.includes(req.user.id))
    const turnNumber = (mapLog.length) ? mapLog[0].turn + 1 : 1

    const battleTable = currentCell 
      ? await models.battleTable.findOne({
        where: {
          turnNumber,
          cellId: currentCell.cellName
        }
      })
      : null

    if (battleTable) {
      res.send({
        status: 'ok',
        data: battleTable
      })
    } else {
      res.send({
        status: 'warning',
        message: `${req.user.username}, ты не участвуешь в этом бою`
      })
    }

  })
}
