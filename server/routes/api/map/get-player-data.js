module.exports = function (router, models) {
  router.post('/map/get-player-data', async(req, res) => {
    const userMapData = await models.userMapData.findByPk(req.user.id)
    if (!userMapData) {
      res.send({
        status: 'warning',
        message: 'Не найдены данные пользователя'
      })
      return
    }

    const [rawCellList, rawBattleTableList] = await Promise.all([
      models.mapCell.findAll({
        attributes: ['cellName', 'dataJson']
      }),
      models.battleTable.findAll()
    ])

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
        battleStatus: checkBattleStatus()
      }
    })

    function checkBattleStatus() {
      let inBattle = false
      let winner = false

      if (currentCell && currentCell.players.length > 1) {

        rawBattleTableList.some(rawBattleTable => {
          const battleTable = JSON.parse(rawBattleTable.dataJson)


          if (battleTable.pair1.includes(req.user.id) && battleTable.pair1.length > 1) {
            if (!battleTable.winner) inBattle = true
            return true
          }
          if (battleTable.pair2.includes(req.user.id) && battleTable.pair2.length > 1) {
            if (!battleTable.winner) inBattle = true
            return true
          }
          if (battleTable.finalPair.includes(req.user.id) && battleTable.finalPair.length > 1) {
            if (!battleTable.winner) inBattle = true
            if (battleTable.winner === req.user.id) winner = true
            return true
          }

          winner = true
          return false
        })
      }

      return {
        inBattle,
        winner
      }
    }

  })
}
