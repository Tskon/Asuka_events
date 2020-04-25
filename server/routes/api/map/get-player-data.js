module.exports = function (router, models) {
  router.post('/map/get-player-data', async(req, res) => {
    let playerData = await models.Player.findOne({username: req.user.username})

    if (!playerData) {
      await models.Player.create({ username: req.user.username })
      playerData = await models.Player.findOne({username: req.user.username})
    }

    const turnsCount = await models.Log.countDocuments()

    const [battleTable, cells] = await Promise.all([
      models.BattleTable.findOne({ turnNumber: turnsCount, cellName: playerData.currentCell }),
      models.Cell.find()
    ])

    const currentCell = cells.find(cell => cell.name === playerData.currentCell)
    const battleStatus = checkBattleStatus(battleTable, req.user.username)
    const filter = (battleStatus.winner && currentCell)
      ? cell => cell.name === currentCell.name || currentCell.connectedCells.includes(cell.name)
      : cell => cell.started
    const selectableCells = cells.filter(filter).map(cell => cell.name)

    res.send({
      status: 'ok',
      data: {
        currentCell: playerData.currentCell,
        selectedCell: playerData.selectedCell,
        ownedCell: playerData.ownedCell,
        ownInRowCount: playerData.ownInRowCount,
        selectableCells,
        score: playerData.score,
        battleStatus
      }
    })

    function checkBattleStatus(battleTable, username) {
      let inBattle = false
      let winner = false

      if (!battleTable) {
        return{
          inBattle,
          winner: true
        }
      }

      if (battleTable.finalPair.winner === username) {
        winner = true
      } else if (battleTable.firstPair.winner === username || battleTable.secondPair.winner === username) {
        inBattle = true
      }

      return {
        inBattle,
        winner
      }
    }
  })
}
