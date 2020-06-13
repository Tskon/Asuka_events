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
    } else if (req.body.status) {
      player.events.push({ slug: req.body.eventSlug })
      await models.Player.updateOne({ username: req.body.username }, player)
    } else {
      const eventToDelete = player.events.find(event => event.slug === req.body.eventSlug)
      await models.Player.updateOne({ username: req.body.username }, {
        $pull: { events: {
          $gte: eventToDelete
        } }
      }, { multi: true })
    }

    res.send({
      status: 'ok'
    })
  })
}
