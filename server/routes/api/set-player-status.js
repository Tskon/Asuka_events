module.exports = function (router, models) {
  router.post('/set-player-status', (req, res) => {
    if (req.isAuthenticated() && req.user.is_admin) {
      models.user_lk_data.findByPk(req.user.id)
        .then((userDataObject) => {
          if (userDataObject) {
            models.user.update({
              is_player: req.body.status,
            }, {
              where: {user_id: req.user.id},
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
