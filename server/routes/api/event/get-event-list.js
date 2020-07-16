module.exports = function (router, models) {
  router.post('/event/get-event-list', async (req, res) => {
    const [eventList, players, users] = await Promise.all([
      models.Event.find(),
      models.Player.find({}, 'username events'),
      models.User.find({ isPlayer: true }, 'username clanTag clanName avatar')
    ])

    const parsedEventList = eventList.map(async event => {
      const eventPlayers = []

      players.forEach(player => {
        const findedPlayerEvent = player.events.find(playerEvent => playerEvent.slug === event.slug)
        if (!findedPlayerEvent) return

        const findedUser = users.find(user => user.username === player.username)

        const changedPlayer = {
          ...findedUser,
          score: findedPlayerEvent.score,
          currentCell: findedPlayerEvent.currentCell,
          selectedCell: findedPlayerEvent.selectedCell,
          ownedCell: findedPlayerEvent.ownedCell,
          ownInRowCount: findedPlayerEvent.ownInRowCount
        }
        eventPlayers.push(changedPlayer)
      })

      const logCount = await models.Log.countDocuments({eventSlug: event.slug})
      const turnsNumber = logCount + 1
      const currentTurn = event.turnList.find(turnData => turnData.turnNumber === turnsNumber )

      const cellsWithPlayers = event.cellList.map((cell) => {
        const { name, started, bonus, connectedCells, gameMap, incomeStatus } = cell
        const filteredPlayers = eventPlayers.filter(player => {
          return player.currentCell === cell.name
        })

        return {
          name,
          gameMap,
          started,
          bonus,
          connectedCells,
          incomeStatus,
          players: filteredPlayers.map(player => {
            return users.find(user => user.username === player.username)
          })
        }
      })

      const currentCell = cellsWithPlayers.find((cell) => {
        // TODO cell.players = [undefined, undefined]
        console.log(cell)
        return false
        // return cell.players.some(player => player.username === req.user.username)
      })

      const filteredData = cellsWithPlayers.map((cell) => {
        const isFullData = currentCell
          ? cell.name === currentCell.name || cell.connectedCells.includes(currentCell.name)
          : cell.started || req.user.isAdmin

        return isFullData ? cell : {
          name: cell.name,
          connectedCells: cell.connectedCells,
          players: [],
          bonus: cell.bonus,
          started: cell.started,
          gameMap: cell.gameMap
        }
      })

      return {
        slug: event.slug,
        name: event.name,
        bonusForWin: event.bonusForWin,
        turnList: event.turnList,
        currentTurn,
        columns: event.columns,
        rows: event.rows,
        cellList: (currentTurn && currentTurn.fog) ? filteredData : cellsWithPlayers
      }
    })
    const data = await Promise.all(parsedEventList)

    res.send({
      status: 'ok',
      data: {
        eventList: data
      }
    })
  })
}
