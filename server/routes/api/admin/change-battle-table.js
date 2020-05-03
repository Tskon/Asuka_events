module.exports = function (router, models) {
  router.post('/admin/change-battle-table', async (req, res) => {
    const turnsCount = await models.Log.countDocuments()

    const { firstPairWinner, secondPairWinner, finalPairWinner, players } = req.body

    const newBattleTable = {
      players,
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
