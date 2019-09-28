module.exports = function (router, models) {
  router.post('/map/choose-sector', (req, res) => {
    models.userMapData.findByPk(req.user.id)
      .then((userMapData) => {
        if (!userMapData) {
          models.userMapData.create({
            userId: req.user.id,
            cellId: req.body.cellId
          })
          return
        }

        models.userMapData.update({
          cellId: req.body.cellId
        }, {
          where: { userId: req.user.id },
        })
          .then(() => {
            res.send({
              status: 'ok'
            })
          })
      })
  })
}
