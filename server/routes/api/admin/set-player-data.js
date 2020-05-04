module.exports = function (router, models) {
  router.post('/admin/set-player-data', async (req, res) => {
    const {
      username,
      score,
      currentCell,
      selectedCell,
      ownedCell,
      ownInRowCount
    } = req.body

    await models.Player.updateOne({ username } , {
      score,
      currentCell,
      selectedCell,
      ownedCell,
      ownInRowCount
    })

    res.send({
      status: 'success',
      message: 'Данные успешно перезаписаны'
    })
  })
}
