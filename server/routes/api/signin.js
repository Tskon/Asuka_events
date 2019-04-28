module.exports = function (router, models, passport) {
  models.sequelize.sync()
  router.post('/signin', passport.authenticate('local-signin'), (req, res) => {
    res.send({
      status: 'ok',
      data: {
        name: req.user.username,
        id: req.user.id,
      },
    })
  })
}
