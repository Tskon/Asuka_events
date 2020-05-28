module.exports = function (router, models) {
  router.post('/admin/get-events', async (req, res) => {
    const events = await models.Event.find()

    res.send({
      status: 'success',
      data: {
        events
      }
    })
  })
}
