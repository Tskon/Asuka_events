module.exports = function (router, models) {
  router.post('/event/set-match-result', async (req, res) => {
    const { isWinner, eventSlug } = req.body

    const turnsCount = await models.Log.countDocuments()

    const player = await models.Player.findOne({ username: req.user.username})
    const currentEvent = player.events.find(event => event.slug === eventSlug)

    const battleTable = await models.BattleTable.findOne({
      eventSlug,
      turnNumber: turnsCount + 1,
      cellName: currentEvent.currentCell
    })

    // TODO разобраться почему не записывается победа

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
      eventSlug,
      turnNumber: turnsCount + 1,
      cellName: currentEvent.currentCell
    }, battleTable)

    res.send({
      status: 'success',
      message: 'Результат записан'
    })
  })
}
