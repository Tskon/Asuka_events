module.exports = function (router, models) {
  router.post('/admin/clean-event-data', async (req, res) => {
    models.mapCell.destroy({
      where: {},
      truncate: true
    })
    models.battleTable.destroy({
      where: {},
      truncate: true
    })
    models.mapLog.destroy({
      where: {},
      truncate: true
    })

    models.userMapData.destroy({
      where: {},
      truncate: true
    })

    require('../../../dbInitData/mapCells')(models)

    res.send({
      status: 'info',
      message: 'Данные эвента успешно удалены'
    })
  })
}
