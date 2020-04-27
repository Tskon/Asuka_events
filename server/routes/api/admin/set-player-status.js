module.exports = function (router, models) {
  router.post('/admin/set-player-status', async (req, res) => {
    await models.User.updateOne({ username: req.body.username }, { isPlayer: req.body.status })

    if (!await models.Player.findOne({ username: req.body.username })) {
      await models.Player.create({ username: req.body.username })
    }

    res.send({
      status: 'ok'
    })
  })
}
