module.exports = function (router, models) {
  router.post('/event/get-current-turn', async (req, res) => {
    const event = await models.Event.findOne({ slug: req.body.eventSlug })
    const turnsCount = await models.Log.countDocuments({ eventSlug: req.body.eventSlug })

    const {turnNumber, fog, type} = event.turnList.find( turn => {
      return turn.turnNumber === turnsCount + 1
    })

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
