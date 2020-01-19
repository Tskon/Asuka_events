module.exports = function (router, models) {
  router.post('/map/choose-sector', async (req, res) => {
    const usersInChosenSector = await models.userMapData.findAll({
      where: {
        selectedCellId: req.body.cellId
      }
    })

    if (usersInChosenSector.length > 3) {
      res.send({ status: 'info', message: 'В данном секторе кончились места' })
      return
    }

    const userMapData = await models.userMapData.findByPk(req.user.id)

    if (!userMapData) {
      models.userMapData.create({
        userId: req.user.id,
        selectedCellId: req.body.cellId
      })
      return
    }

    await models.userMapData.update({
      selectedCellId: req.body.cellId
    }, {
      where: { userId: req.user.id }
    })

    res.send({
      status: 'success',
      message: 'Сектор успешно выбран'
    })
  })
}
