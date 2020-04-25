module.exports = function (router, models) {
  router.post('/map/choose-sector', async (req, res) => {
    const usersInChosenSector = await models.User.find({ selectedCell: req.body.cellName })

    if (usersInChosenSector.length > 3) {
      res.send({ status: 'info', message: 'В данном секторе кончились места' })
      return
    }

    await models.Player.updateOne({
      username: req.user.username
    }, {
      selectedCell: req.body.cellName
    })

    res.send({
      status: 'success',
      message: 'Сектор успешно выбран'
    })
  })
}
