module.exports = function (router, models) {
  router.post('/map/choose-sector', (req, res) => {
    models.userMapData.findByPk(req.user.id)
      .then((userMapData) => {
        if (!userMapData) {
          models.userMapData.create({
            userId: req.user.id,
            selectedCellId: req.body.cellId
          })
          return
        }

        models.userMapData.update({
          selectedCellId: req.body.cellId
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
