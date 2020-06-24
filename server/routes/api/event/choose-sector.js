module.exports = function (router, models) {
  router.post('/event/choose-sector', async (req, res) => {
    const [usersInChosenSector, player] = await Promise.all([
      models.Player.find({ events : { $elemMatch: {
        slug: { $gte: req.body.eventSlug },
        selectedCell: { $gte: req.body.cellName }
      }}}),
      models.Player.findOne({username: req.user.username})
    ])

    if (usersInChosenSector.length > 3) {
      res.send({ status: 'info', message: 'В данном секторе кончились места' })
      return
    }

    player.events.some(event => {
      if (event.slug === req.body.eventSlug) {
        event.selectedCell = req.body.cellName
        return true
      }
      return false
    })

    await models.Player.updateOne({
      username: req.user.username
    }, player)

    res.send({
      status: 'success',
      message: 'Сектор успешно выбран'
    })
  })
}
