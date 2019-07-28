module.exports = function (router, models) {
  router.post('/map/choose-start-sector', (req, res) => {
    models.user_map_data.findByPk(req.user.id)
      .then((userMapData) => {
        if (!userMapData) {
          models.user_map_data.create({
            user_id: req.user.id,
            ceil_id: req.body.cellId
          })
          return
        }

        models.user_map_data.update({
          ceil_id: req.body.cellId
        }, {
          where: { user_id: req.user.id },
        })
      })

  })
}
