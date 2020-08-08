module.exports = function (router, models) {
  router.post('/admin/set-player-data', async (req, res) => {
    const {
      eventSlug,
      username,
      score,
      currentCell,
      selectedCell,
      ownedCell,
      ownInRowCount
    } = req.body

    const [playerFromDB, turnsCount, players, users] = await Promise.all([
      models.Player.findOne({ username }),
      models.Log.countDocuments({ eventSlug: req.body.eventSlug }),
      models.Player.find({ events : { $elemMatch: {  slug : { $gte: eventSlug } } } }),
      models.User.find()
    ])

    const playerListInCurrentCell = players.filter(player => {
      return player.events.some(event => event.slug === eventSlug && event.currentCell === currentCell)
    })

    const turnNumber = turnsCount + 1

    if (!playerFromDB) {
      res.send({
        status: 'error',
        message: 'Пользователь не найден'
      })
      return
    }

    playerFromDB.events.some(event => {
      if (event.slug === eventSlug) {
        event.score = score
        event.currentCell = currentCell
        event.selectedCell = selectedCell
        event.ownedCell = ownedCell
        event.ownInRowCount = ownInRowCount
        return true
      }

      return false
    })

    await models.Player.updateOne({ username } , playerFromDB)

    if (playerListInCurrentCell.length > 1) {
      createBattleTable(playerListInCurrentCell.map(player => player.username), users)
    }

    res.send({
      status: 'success',
      message: 'Данные успешно перезаписаны'
    })

    function createBattleTable(playerList, users) {
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
        cellName: currentCell,
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
    }
  })
}

