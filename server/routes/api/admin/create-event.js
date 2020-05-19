module.exports = function (router, models) {
  router.post('/admin/create-event', async (req, res) => {
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

    if (await models.Event.countDocuments({ eventSlug })) {
      res.send({
        status: 'warning',
        message: 'Такой эвент уже существует'
      })

      return
    }

    await models.Event.create({
      eventSlug,
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
      message: 'Данные успешно перезаписаны'
    })
  })
}
