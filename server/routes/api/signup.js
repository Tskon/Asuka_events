module.exports = function (router, models, passport) {
  models.sequelize.sync()
  router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
    res.send({
      status: 'ok',
      data: {
        name: req.user.username,
        id: req.user.id,
        isAdmin: req.user.is_admin,
        isPlayer: req.user.is_player,
      },
    })
  })
}
