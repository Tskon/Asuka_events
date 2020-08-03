// TODO создавать боевую таблицу

module.exports = function (router, models) {
  router.post('/admin/set-player-data', async (req, res) => {
    const {
      eventSlug,
      username,
      score,
      currentCell,
      selectedCell,
      ownedCell,
      ownInRowCount
    } = req.body

    const playerFromDB = await models.Player.findOne({ username })

    if (!playerFromDB) {
      res.send({
        status: 'error',
        message: 'Пользователь не найден'
      })
      return
    }

    playerFromDB.events.some(event => {
      if (event.slug === eventSlug) {
        event.score = score
        event.currentCell = currentCell
        event.selectedCell = selectedCell
        event.ownedCell = ownedCell
        event.ownInRowCount = ownInRowCount
        return true
      }

      return false
    })

    await models.Player.updateOne({ username } , playerFromDB)

    res.send({
      status: 'success',
      message: 'Данные успешно перезаписаны'
    })
  })
}
