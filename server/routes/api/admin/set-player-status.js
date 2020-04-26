module.exports = function (router, models) {
  router.post('/admin/set-player-status', async (req, res) => {
    await models.User.updateOne({ username: req.body.username }, { isPlayer: req.body.status })

    res.send({
      status: 'ok'
    })
  })
}
