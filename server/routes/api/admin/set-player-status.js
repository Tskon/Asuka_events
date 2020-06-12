module.exports = function (router, models) {
  router.post('/admin/set-player-status', async (req, res) => {
    const player = await models.Player.findOne({ username: req.body.username })

    if (!player && req.body.status) {
      await models.Player.create({
        username: req.body.username,
        events: [{
          slug: req.body.eventSlug
        }]
      })
    } else {
      if (req.body.status) {
        player.events.push({ slug: req.body.eventSlug })
      } else {
        player.events = player.events.filter(event => event.slug !== req.body.eventSlug)
      }

      models.Player.updateOne({ username: req.body.username }, player)
    }

    res.send({
      status: 'ok'
    })
  })
}
