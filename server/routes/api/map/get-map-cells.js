module.exports = function (router, models) {
  router.post('/map/get-map-cells', async (req, res) => {
    const [cells, players] = await Promise.all([
      models.Cell.find(),
      models.Player.find()
    ])

    const turnsCount = await models.Log.count()
    const currentTurn = await models.TurnType.findOne({
      turnNumber: turnsCount + 1
    }, 'number fog type')

    const cellsWithPlayers = cells.map((cell) => {
      const cellCopy = {...cell}
      cellCopy.players = players.filter(player => player.currentCell === cell.name)
      return cellCopy
    })

    const currentCell = cellsWithPlayers.find((cell) => {
      return cell.players.some(player => player.id === req.user.id)
    })


    const filteredData = cellsWithPlayers.map((cell) => {
      const isFullData = currentCell
        ? cell.id === currentCell.id || cell.connectedCells.includes(currentCell.id)
        : cell.isStarted

      return isFullData ? cell : {
        id: cell.id,
        connectedCells: cell.connectedCells,
        players: [],
        bonus: cell.bonus,
        isStarted: cell.isStarted
      }
    })

    res.send({
      status: 'ok',
      data: currentTurn.fog ? filteredData : cellsWithPlayers
    })

  })
}
