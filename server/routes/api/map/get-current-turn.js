module.exports = function (router, models) {
  router.post('/map/get-current-turn', (req, res) => {
    models.mapLog.findAll({
      limit: 1,
      order: [['turn', 'DESC']],
      attributes: ['turn']
    })
      .then(log => {
        const turnNumber = (log.length) ? log[0].turn + 1 : 1

        models.mapTurnData.findOne({
          where: {turnNumber},
          attributes: ['turnNumber', 'turnName', 'fog']
        })
          .then(turn => {
            res.send({
              status: 'ok',
              data: turn
            })
          })
      })
  })
}
