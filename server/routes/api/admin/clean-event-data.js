module.exports = function (router, models) {
  router.post('/admin/clean-event-data', async (req, res) => {
    await models.BattleTable.deleteMany({ eventSlug: req.body.eventSlug })
    await models.Log.deleteMany({ eventSlug: req.body.eventSlug })

    const players = await models.Player.find()

    const updatePromises = players.map(player => {
      player.events = player.events.forEach(event => {
        if( event.slug !== req.body.eventSlug) {
          event = {
            slug: req.body.eventSlug,
            score: 0,
            currentCell: '',
            selectedCell: '',
            ownedCell: '',
            ownInRowCount: 0
          }
        }
      })

      return models.Player.updateOne({ username: player.username }, player)
    })

    await Promise.all(updatePromises)

    res.send({
      status: 'info',
      message: 'Данные эвента успешно удалены'
    })
  })
}
