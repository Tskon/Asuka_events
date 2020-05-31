module.exports = function (router, models) {
  router.post('/admin/delete-event', async (req, res) => {
    const { slug } = req.body

    if (!await models.Event.countDocuments({ slug })) {
      res.send({
        status: 'warning',
        message: 'Такой эвент не существует'
      })

      return
    }

    await models.Event.deleteOne({ slug })

    res.send({
      status: 'success',
      message: 'Эвент успешно удален'
    })
  })
}
