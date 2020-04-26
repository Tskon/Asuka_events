module.exports = function (router, models) {
  router.post('/admin/clean-event-data', async (req, res) => {
    await models.BattleTable.deleteMany({})
    await models.Log.deleteMany({})
    await models.Player.updateMany({}, {
      score: 0,
      currentCell: '',
      selectedCell: '',
      ownedCell: '',
      ownInRowCount: 0
    })

    res.send({
      status: 'info',
      message: 'Данные эвента успешно удалены'
    })
  })
}
