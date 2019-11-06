module.exports = function (router, models) {
  router.post('/map/get-player-data', (req, res) => {
    models.userMapData.findByPk(req.user.id)
      .then((userMapData) => {
        if (!userMapData) return

        res.send({
          status: 'ok',
          data: {
            cellId: userMapData.cellId,
            score: userMapData.score
          }
        })
      })
  })
}