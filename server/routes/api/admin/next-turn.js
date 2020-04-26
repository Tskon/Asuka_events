module.exports = function (router, models) {
  router.post('/admin/next-turn', async (req, res) => {
    const turnsCount = await models.Log.countDocuments()
    const turnNumber = turnsCount + 1

    const [
      cells,
      players,
      battleTables
    ] = await Promise.all([
      models.Cell.find().sort({name: 1}),
      models.Player.find(),
      models.BattleTable.find({ turnNumber })
    ])

    await models.Log.create({
      turnNumber,
      players
    })

    players.forEach(playerData => {
      const isWinner = checkIsWinner(battleTables, playerData)

      if (playerData.ownedCell) {
        const cell = cells.find(cellData => cellData.name === playerData.currentCell)
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

      smartSectorChoose(playerData, isWinner, cells, players)

      playerData.selectedCell = ''
    })

    createBattleTables({cells, players, turnNumber: turnNumber + 1})

    await Promise.all(
      players.map(player => {
        console.log('updated player info: ', player)
        return models.Player.updateOne({ username: player.username }, player)
      })
    )

    res.send({
      status: 'success',
      message: `Начат ход №${turnNumber + 1}`
    })
  })

  function createBattleTables({cells, players, turnNumber}) {
    cells.forEach((cell) => {
      const playerList = players.filter(player => player.currentCell === cell.name)
      if (playerList.length < 2) return

      const firstPair = { winner: '', looser: '' }
      const secondPair = { winner: '', looser: '' }
      const finalPair = { winner: '', looser: '' }

      if (playerList.length === 2) {
        [firstPair.winner, secondPair.winner] = playerList
        firstPair.looser = '---'
        secondPair.looser = '---'
      }

      if (playerList.length === 3) {
        // eslint-disable-next-line prefer-destructuring
        secondPair.winner = playerList[2]
        secondPair.looser = '---'
      }

      models.BattleTable.create({
        turnNumber,
        cellName: cell.name,
        players: playerList,
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
      if (player.selectedCell) player.currentCell = player.selectedCell
      return
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
