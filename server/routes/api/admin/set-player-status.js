module.exports = function (router, models) {
  router.post('/admin/set-player-status', (req, res) => {
    models.user.findByPk(req.user.id)
      .then((userDataObject) => {
        if (userDataObject) {
          models.user.update({
            is_player: req.body.status,
          }, {
            where: {id: req.body.userId},
          })
        }
      })
    res.send({
      status: 'ok',
    })
  })
}
