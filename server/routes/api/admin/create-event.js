module.exports = function (router, models) {
  router.post('/admin/create-event', async (req, res) => {
    const {
      slug,
      name,
      columns,
      rows,
      startedSectors,
      richEconomyCells,
      middleEconomyCells,
      poorEconomyCells,
      gameMapList,
      bonusForWin
    } = req.body

    if (await models.Event.countDocuments({ slug })) {
      res.send({
        status: 'warning',
        message: 'Такой эвент уже существует'
      })

      return
    }

    if (
      !slug
      || !name
      || !columns.length
      || !rows.length
      || !startedSectors.length
      || !gameMapList.length
    ) {
      res.send({
        status: 'warning',
        message: 'Эвент не создан, переданы некорректные данные'
      })
    }

    await models.Event.create({
      slug,
      name,
      columns,
      rows,
      startedSectors,
      richEconomyCells,
      middleEconomyCells,
      poorEconomyCells,
      gameMapList,
      bonusForWin
    })

    res.send({
      status: 'success',
      message: 'Эвент создан"'
    })
  })
}
