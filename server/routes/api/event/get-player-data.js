module.exports = function (router, models) {
  router.post('/event/get-player-data', async(req, res) => {
    let playerData = await models.Player.findOne({username: req.user.username})

    if (!playerData) {
      await models.Player.create({ username: req.user.username })
      playerData = await models.Player.findOne({username: req.user.username})
    }

    res.send({
      status: 'success',
      data: {
        events: playerData.events
      }
    })
  })
}
