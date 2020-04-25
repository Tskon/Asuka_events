module.exports = function (router, models) {
  router.post('/map/get-map-cells', async (req, res) => {
    const [cells, players] = await Promise.all([
      models.Cell.find().sort({name: 1}),
      models.Player.find()
    ])

    const turnsCount = await models.Log.countDocuments()
    const currentTurn = await models.TurnType.findOne({
      turnNumber: turnsCount + 1
    }, 'number fog type')

    const cellsWithPlayers = cells.map((cell) => {
      const {name, started, bonus, connectedCells} = cell

      return {
        name,
        started,
        bonus,
        connectedCells,
        players: players.filter(player => player.currentCell === cell.name)
      }
    })

    const currentCell = cellsWithPlayers.find((cell) => {
      return cell.players.some(player => player.id === req.user.id)
    })


    const filteredData = cellsWithPlayers.map((cell) => {
      const isFullData = currentCell
        ? cell.id === currentCell.id || cell.connectedCells.includes(currentCell.id)
        : cell.started

      return isFullData ? cell : {
        id: cell.id,
        connectedCells: cell.connectedCells,
        players: [],
        bonus: cell.bonus,
        started: cell.started
      }
    })

    res.send({
      status: 'ok',
      data: (currentTurn && currentTurn.fog) ? filteredData : cellsWithPlayers
    })

  })
}
