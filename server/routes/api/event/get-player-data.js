module.exports = function (router, models) {
  router.post('/event/get-player-data', async(req, res) => {
    let playerData = await models.Player.findOne({username: req.user.username})

    const logListsByEvent = await Promise.all(playerData.events.map(event => {
      return models.Log.find({ eventSlug: event.slug })
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

      const extendedEvent = {
        ...event._doc,
        _id: null,
        selectableCells: [],
        battleStatus: checkBattleStatus(battleTable, req.username)
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


// module.exports = function (router, models) {
//   router.post('/map/get-player-data', async(req, res) => {
//     let playerData = await models.Player.findOne({username: req.user.username})
//
//     if (!playerData) {
//       await models.Player.create({ username: req.user.username })
//       playerData = await models.Player.findOne({username: req.user.username})
//     }
//
//     const turnsCount = await models.Log.countDocuments()
//
//     const [battleTable, cells] = await Promise.all([
//       models.BattleTable.findOne({ turnNumber: turnsCount, cellName: playerData.currentCell }),
//       models.Cell.find()
//     ])
//
//     const currentCell = cells.find(cell => cell.name === playerData.currentCell)
//     const battleStatus = checkBattleStatus(battleTable, req.user.username)
//     const filter = (battleStatus.winner && currentCell)
//       ? cell => cell.name === currentCell.name || currentCell.connectedCells.includes(cell.name)
//       : cell => cell.started
//     const selectableCells = cells.filter(filter).map(cell => cell.name)
//
//     res.send({
//       status: 'ok',
//       data: {
//         selectableCells,
//         battleStatus
//       }
//     })

//   })
// }
