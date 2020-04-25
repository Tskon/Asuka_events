module.exports = function (router, models) {
  router.post('/map/get-current-turn', async (req, res) => {
    const turnsCount = await models.Log.count()

    const currentTurn = await models.TurnType.findOne({
      turnNumber: turnsCount + 1
    }, 'number fog type')

    res.send({
      status: 'ok',
      data: currentTurn
    })
  })
}
