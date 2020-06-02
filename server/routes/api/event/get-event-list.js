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
        const findedPlayer = player.events.find(playerEvent => playerEvent.slug === event.slug)
        if (!findedPlayer) return

        const findedUser = users.find(user => user.username === findedPlayer.username)
        const findedPlayerEvent = findedPlayer.events.find(playerEvent => playerEvent.slug === event.slug)

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

      const turnsCount = await models.Log.countDocuments({eventSlug: event.slug})
      const currentTurn = event.turnList.find(turnData => turnData.turnNumber === turnsCount )

      const cellsWithPlayers = event.cellList.map((cell) => {
        const { name, started, bonus, connectedCells, gameMap } = cell
        const filteredPlayers = eventPlayers.filter(player => player.currentCell === cell.name)

        return {
          name,
          gameMap,
          started,
          bonus,
          connectedCells,
          players: filteredPlayers.map(player => {
            return users.find(user => user.username === player.username)
          })
        }
      })

      const currentCell = cellsWithPlayers.find((cell) => {
        return cell.players.some(player => player.username === req.user.username)
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
        cellList: (currentTurn && currentTurn.fog) ? filteredData : cellsWithPlayers
      }
    })

    // TODO найти где пропал await
    console.log(parsedEventList)
    res.send({
      status: 'ok',
      data: {
        eventList: parsedEventList
      }
    })
  })
}
