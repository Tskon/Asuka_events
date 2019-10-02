module.exports = function (router, models) {
  router.post('/map/get-logs', (req, res) => {
    models.mapLog.findAll({
      attributes: ['playersJson', 'cellsJson']
    }).then(logs => {
      res.send({
        status: 'ok',
        data: logs.map(log => {
          return {
            players: JSON.parse(log.playersJson),
            map: JSON.parse(log.cellsJson)
          }
        })
      })
    })
  })
}

