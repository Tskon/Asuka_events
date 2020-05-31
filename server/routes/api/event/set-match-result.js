module.exports = function (router, models) {
  router.post('/event/set-match-result', async (req, res) => {
    const turnsCount = await models.Log.countDocuments()
    const player = await models.Player.findOne({ username: req.user.username})
    const battleTable = await models.BattleTable.findOne({
      turnNumber: turnsCount + 1,
      cellName: player.currentCell
    })

    const { isWinner } = req.body

    const isFirstPairWinner = battleTable.firstPair.winner === req.user.username
    const isSecondPairWinner = battleTable.secondPair.winner === req.user.username
    const isFinalPairWinner = battleTable.finalPair.winner === req.user.username
    const isFinalPairLooser = battleTable.finalPair.looser === req.user.username
    const playerIndex = battleTable.players.findIndex(player => player.username === req.user.username)

    if (!isFinalPairLooser && !isFinalPairWinner) {
      if (battleTable.players.length === 2) {
        if (isWinner) battleTable.finalPair.winner = req.user.username
        else battleTable.finalPair.looser = req.user.username
      } else if (battleTable.players.length > 2) {
        if (isFirstPairWinner || isSecondPairWinner) {
          if (isWinner) battleTable.finalPair.winner = req.user.username
          else battleTable.finalPair.looser = req.user.username
        } else {
          const pair = (playerIndex < 2) ? 'firstPair' : 'secondPair'
          if (isWinner) battleTable[pair].winner = req.user.username
          else battleTable[pair].looser = req.user.username
        }
      }
    }


    await models.BattleTable.updateOne({
      turnNumber: turnsCount + 1,
      cellName: player.currentCell
    }, battleTable)

    res.send({
      status: 'success',
      message: 'Результат записан'
    })
  })
}
