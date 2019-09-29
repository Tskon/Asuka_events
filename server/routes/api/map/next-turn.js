module.exports = function (router, models) {
  router.post('/admin/next-turn', (req, res) => {
    models.mapLog.create({
      playersJson: 'piska',
      cellsJson: 'sosiska'
    })
    res.send({
      status: 'ok',
    })
  })
}
