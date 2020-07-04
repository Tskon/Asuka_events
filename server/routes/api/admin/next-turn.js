module.exports = function (router, models) {
  router.post('/admin/next-turn', async (req, res) => {
    const turnsCount = await models.Log.countDocuments({ eventSlug: req.body.eventSlug })
    const turnNumber = turnsCount + 1

    const [
      event,
      players,
      battleTables,
      users
    ] = await Promise.all([
      models.Event.findOne({ slug: req.body.eventSlug}),
      models.Player.find({ events : { $elemMatch: {  slug : { $gte: req.body.eventSlug } } } }),
      models.BattleTable.find({ turnNumber, eventSlug: req.body.eventSlug }),
      models.User.find()
    ])

    await models.Log.create({
      eventSlug: req.body.eventSlug,
      turnNumber,
      players
    })

    players.forEach(playerData => {
      const isWinner = checkIsWinner(battleTables, playerData)

      if (playerData.ownedCell) {
        const cell = event.cellList.find(cellData => cellData.name === playerData.currentCell)
        const bonusCoef = (playerData.ownInRowCount < 3) ? 1 : 0
        playerData.score += cell.bonus * bonusCoef
      }

      if (!isWinner) {
        playerData.ownedCell = ''
        playerData.ownInRowCount = 0
      } else if (playerData.selectedCell === playerData.currentCell || !playerData.selectedCell) {
        playerData.ownedCell = playerData.currentCell
        playerData.ownInRowCount++
      } else if (playerData.selectedCell !== playerData.currentCell) {
        playerData.ownedCell = ''
        playerData.ownInRowCount = 0
      }

      smartSectorChoose(playerData, isWinner, event.cellList, players)

      playerData.selectedCell = ''
    })

    createBattleTables({
      cells: event.cellList,
      players,
      turnNumber: turnNumber + 1,
      users,
      eventSlug: req.body.eventSlug
    })

    await Promise.all(
      players.map(player => {
        return models.Player.updateOne({ username: player.username }, player)
      })
    )

    res.send({
      status: 'success',
      message: `Начат ход №${turnNumber + 1}`
    })
  })

  function createBattleTables({ cells, players, turnNumber, users, eventSlug }) {
    cells.forEach((cell) => {
      const playerList = players
        .filter(player => player.currentCell === cell.name)
        .map(player => player.username)
      if (playerList.length < 2) return

      const firstPair = { winner: null, looser: null }
      const secondPair = { winner: null, looser: null }
      const finalPair = { winner: null, looser: null }

      if (playerList.length === 2) {
        [firstPair.winner, secondPair.winner] = playerList
        firstPair.looser = null
        secondPair.looser = null
      }

      if (playerList.length === 3) {
        // eslint-disable-next-line prefer-destructuring
        secondPair.winner = playerList[2]
        secondPair.looser = null
      }

      models.BattleTable.create({
        eventSlug,
        turnNumber,
        cellName: cell.name,
        players: playerList.map(player => {
          const { username, clanName, clanTag, avatar } = users.find(user => user.username === player)
          return {
            username,
            clanName,
            clanTag,
            avatar
          }
        }),
        firstPair,
        secondPair,
        finalPair
      })
    })
  }

  function smartSectorChoose(player, isWinner, cells, players) {
    const availableSectors = cells.filter((cell) => {
      const playersCount = players.filter(playerData => {
        return playerData.currentCell === cell.name && playerData.username !== player.username
      }).length
      return cell.started && playersCount < 4
    })

    if (isWinner) {
      if (player.selectedCell) {
        player.currentCell = player.selectedCell
        return
      }

      const currentSector = cells.find(cell => cell.name === player.currentCell)

      if (currentSector && currentSector.started) {
        const connectedAvailableSectors = cells.filter(cell => {
          const playersCount = players.filter(playerData => {
            return playerData.currentCell === cell.name && playerData.username !== player.username
          }).length

          return !cell.started && playersCount < 4 && currentSector.connectedCells.includes(cell.name)
        })

        const randomSector = connectedAvailableSectors[Math.floor(Math.random() * connectedAvailableSectors.length)]
        if (randomSector) {
          player.currentCell = randomSector.name
        }
        return
      }

      if (currentSector && !currentSector.started) return
    }

    const randomSector = availableSectors[Math.floor(Math.random() * availableSectors.length)]

    if (!player.selectedCell) {
      player.currentCell = randomSector.name
      return
    }

    if (availableSectors.some(cell => cell.name === player.selectedCell)) {
      player.currentCell = player.selectedCell
    } else {
      player.currentCell = randomSector.name
    }
  }

  function checkIsWinner(battleTables, player) {
    const battleTable = battleTables.find(bt => bt.cellName === player.currentCell)
    return !battleTable || battleTable.finalPair.winner === player.username
  }
}
