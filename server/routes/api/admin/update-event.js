module.exports = function (router, models) {
  router.post('/admin/update-event', async (req, res) => {
    const {
      eventSlug,
      eventName,
      columns,
      rows,
      startedSectors,
      richEconomyCells,
      middleEconomyCells,
      poorEconomyCells,
      gameMapList
    } = req.body

    if (!await models.Event.countDocuments({ eventSlug })) {
      res.send({
        status: 'warning',
        message: 'Такой эвент не существует'
      })

      return
    }

    await models.Event.updateOne({ eventSlug }, {
      eventName,
      columns,
      rows,
      startedSectors,
      richEconomyCells,
      middleEconomyCells,
      poorEconomyCells,
      gameMapList
    })

    res.send({
      status: 'success',
      message: 'Эвент успешно обновлен'
    })
  })
}
