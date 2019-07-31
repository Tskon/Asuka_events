module.exports = function (router, models) {
  router.post('/map/choose-start-sector', (req, res) => {
    models.userMapData.findByPk(req.user.id)
      .then((userMapData) => {
        if (!userMapData) {
          models.userMapData.create({
            userId: req.user.id,
            ceilId: req.body.cellId
          })
          return
        }

        models.userMapData.update({
          ceilId: req.body.cellId
        }, {
          where: { userId: req.user.id },
        })
      })

  })
}
