module.exports = function (router, models) {
  router.post('/admin/set-player-status', (req, res) => {
    if (req.isAuthenticated() && req.user.is_admin) {
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
    } else {
      res.send({
        status: 'error',
        message: 'Вы не авторизованы',
      })
    }
  })
}
