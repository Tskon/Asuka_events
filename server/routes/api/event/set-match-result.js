module.exports = function (router, models) {
  router.post('/event/set-match-result', async (req, res) => {
    const { isWinner, eventSlug } = req.body

    const [turnsCount, player, eventData] = await Promise.all([
      models.Log.countDocuments(),
      models.Player.findOne({ username: req.user.username}),
      models.Event.findOne({ slug: eventSlug })
    ])

    const currentEvent = player.events.find(event => event.slug === eventSlug)

    const battleTable = await models.BattleTable.findOne({
      eventSlug,
      turnNumber: turnsCount + 1,
      cellName: currentEvent.currentCell
    })

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

    if (isWinner) {
      currentEvent.score += eventData.bonusForWin
      await models.Player.updateOne({username: req.user.username}, player)
    }

    res.send({
      status: 'success',
      message: 'Результат записан'
    })
  })
}
