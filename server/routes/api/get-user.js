module.exports = function (router, models, passport) {
  models.sequelize.sync()
  router.post('/get-user', (req, res) => {
    if (req.isAuthenticated()) {
      res.send({
        status: 'ok',
        data: {
          name: req.user.username,
          id: req.user.id,
          isAdmin: req.user.is_admin,
          isPlayer: req.user.is_player,
        },
      })
    } else {
      res.send({
        status: 'error',
        message: 'Пользователь не авторизован',
      })
    }
  })
}
