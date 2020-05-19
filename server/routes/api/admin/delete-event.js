module.exports = function (router, models) {
  router.post('/admin/delete-event', async (req, res) => {
    const { eventSlug } = req.body

    if (!await models.Event.countDocuments({ eventSlug })) {
      res.send({
        status: 'warning',
        message: 'Такой эвент не существует'
      })

      return
    }

    await models.Event.deleteOne({ eventSlug })

    res.send({
      status: 'success',
      message: 'Эвент успешно удален'
    })
  })
}
