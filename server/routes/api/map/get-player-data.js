module.exports = function (router, models) {
  router.post('/map/get-player-data', (req, res) => {
    models.userMapData.findByPk(req.user.id)
      .then(async (userMapData) => {
        if (!userMapData) return

        const rawCellList = await models.mapCell.findAll({
          attributes: ['cellName', 'dataJson']
        })

        const cellList = rawCellList.map((cell) => ({
          cellName: cell.cellName,
          ...JSON.parse(cell.dataJson)
        }))

        const currentCell = cellList.find((cell) => cell.players.includes(userMapData.userId))

        const selectableCellIds = currentCell
          ? currentCell.connectedCells
          : cellList.filter((cell) => cell.isStarted)

        res.send({
          status: 'ok',
          data: {
            currentCellId: currentCell ? currentCell.cellName : '',
            selectedCellId: userMapData.selectedCellId,
            selectableCellIds,
            score: userMapData.score,
            inBattle: false, // TODO add logic
            battleResults: [] // TODO add logic [true, false]
          }
        })
      })
  })
}
