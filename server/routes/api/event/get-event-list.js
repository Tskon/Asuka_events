module.exports = function (router, models) {
  router.post('/event/get-event-list', async (req, res) => {
    const eventList = await models.Event.find()

    res.send({
      status: 'ok',
      data: {
        eventList
      }
    })
  })
}
