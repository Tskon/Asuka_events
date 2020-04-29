module.exports = function (router, models) {
  router.post('/map/set-match-result', async (req, res) => {
    const turnsCount = await models.Log.countDocuments()
    const player = await models.Player.findOne({ username: req.user.username})
    const battleTable = await models.BattleTable.findOne({
      turnNumber: turnsCount + 1,
      cellName: player.currentCell
    })

    const { isWinner } = req.body

    const isFirstPairWinner = battleTable.firstPair.winner === req.user.username
    const isSecondPairWinner = battleTable.secondPair.winner === req.user.username
    const playerIndex = battleTable.players.findIndex(player => player.username === req.user.username)

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

    const usersInChosenSector = await models.User.find({ selectedCell: req.body.cellName })

    if (usersInChosenSector.length > 3) {
      res.send({ status: 'info', message: 'В данном секторе кончились места' })
      return
    }

    await models.Player.updateOne({
      username: req.user.username
    }, {
      selectedCell: req.body.cellName
    })

    res.send({
      status: 'success',
      message: 'Сектор успешно выбран'
    })
  })
}
