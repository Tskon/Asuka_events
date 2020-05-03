module.exports = function (router, models) {
  router.post('/admin/change-battle-table', async (req, res) => {
    const users = await models.User.find({ isPlayer: true })
    const parsedUsers = users.map(({username, clanName, clanTag, avatar}) => ({
      username,
      clanName,
      clanTag,
      avatar
    }))
    const turnsCount = await models.Log.countDocuments()

    const { firstPairWinner, secondPairWinner, finalPairWinner, players } = req.body

    const newBattleTable = {
      players: players.map(player => {
        return parsedUsers.find(user => user.username === player)
      } ),
      firstPair: {
        winner: players.length > 2 ? firstPairWinner : players[0],
        looser: null
      },
      secondPair: {
        winner: players.length > 2 ? secondPairWinner : players[1],
        looser: null
      },
      finalPair: {
        winner: finalPairWinner,
        looser: null
      }
    }


    await models.BattleTable.updateOne({
      turnNumber: turnsCount + 1,
      cellName: req.body.cellName
    }, newBattleTable)

    res.send({
      status: 'success',
      message: 'Таблица изменена'
    })
  })
}
