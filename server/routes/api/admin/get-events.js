module.exports = function (router, models) {
  router.post('/admin/get-events', async (req, res) => {
    const [events, logs] = await Promise.all([
      models.Event.find({}, 'name slug'),
      models.Log.find()
    ])

    const eventsWithTurnNumbers = events.map(event => {
      const filteredLog = logs.filter(log => log.eventSlug === event.slug)
      return {
        ...event._doc,
        turnNumber: filteredLog.length + 1
      }
    })

    res.send({
      status: 'success',
      data: {
        events: eventsWithTurnNumbers
      }
    })
  })
}
