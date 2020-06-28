module.exports = function (router, models) {
  router.post('/admin/delete-event', async (req, res) => {
    const { slug } = req.body

    if (!await models.Event.countDocuments({ slug })) {
      res.send({
        status: 'warning',
        message: 'Такого эвента не существует'
      })

      return
    }

    await models.BattleTable.deleteMany({ eventSlug: slug })
    await models.Log.deleteMany({ eventSlug: slug })
    await models.Event.deleteOne({ slug })

    const players = await models.Player.find()

    const updatePromises = players.map(player => {
      player.events = player.events.filter(event => {
        return event.slug !== slug
      })
      return models.Player.updateOne({ username: player.username }, player)
    })
    await Promise.all(updatePromises)

    res.send({
      status: 'success',
      message: 'Эвент успешно удален'
    })
  })
}
