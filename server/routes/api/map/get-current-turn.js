module.exports = function (router, models) {
  router.post('/map/get-current-turn', async (req, res) => {
    const turnsCount = await models.Log.countDocuments()

    const {turnNumber, fog, type} = await models.TurnType.findOne({
      turnNumber: turnsCount + 1
    }, 'turnNumber fog type')

    res.send({
      status: 'ok',
      data: {
        turnNumber,
        fog,
        type
      }
    })
  })
}
