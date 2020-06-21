module.exports = function (router, models) {
  router.post('/event/get-player-data', async(req, res) => {
    let playerData = await models.Player.findOne({username: req.user.username})

    const logListsByEvent = await Promise.all(playerData.events.map(event => {
      return models.Log.find({ eventSlug: event.slug })
    }))

    const eventsData = await Promise.all(playerData.events.map(event => {
      return models.Event.findOne({ slug: event.slug })
    }))

    const battleTables = await Promise.all(playerData.events.map((event, i) => {
      return models.BattleTable.find({
        eventSlug: event.slug,
        turnNumber: logListsByEvent[i].length + 1
      })
    }))

    if (!playerData) {
      await models.Player.create({ username: req.user.username })
      playerData = await models.Player.findOne({username: req.user.username})
    }

    const playerDataByEvents = playerData.events.map((event, i) => {
      const turnNumber = logListsByEvent[i].filter(log => log.eventSlug === event.slug).length + 1

      const battleTable = battleTables.find(bt => {
        return bt.eventSlug === event.slug && bt.turnNumber === turnNumber
      })
      const battleStatus = checkBattleStatus(battleTable, req.username)

      const currentCellData = eventsData[i].cellList.find(cell => cell.name === event.currentCell)
      const filter = (battleStatus.winner && currentCellData)
        ? cell => cell.name === currentCellData.name || currentCellData.connectedCells.includes(cell.name)
        : cell => cell.started
      const selectableCells = eventsData[i].cellList.filter(filter).map(cell => cell.name)

      const extendedEvent = {
        ...event._doc,
        _id: null,
        selectableCells,
        battleStatus
      }

      return extendedEvent
    })

    res.send({
      status: 'success',
      data: {
        events: playerDataByEvents
      }
    })
  })
}


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
