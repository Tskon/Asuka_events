module.exports = function (router, models) {
  router.post('/map/choose-sector', async (req, res) => {
    const usersInChosenSector = await models.User.find({ selectedCellId: req.body.cellId })

    if (usersInChosenSector.length > 3) {
      res.send({ status: 'info', message: 'В данном секторе кончились места' })
      return
    }

    await models.User.updateOne({
      username: req.user.username
    }, {
      selectedCellId: req.body.cellId
    })

    res.send({
      status: 'success',
      message: 'Сектор успешно выбран'
    })
  })
}
