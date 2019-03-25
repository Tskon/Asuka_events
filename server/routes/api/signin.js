module.exports = function (router, models, passport) {
  models.sequelize.sync()
  router.post('/signin', passport.authenticate('local-signin', { failureFlash: true }), (req, res) => {
    res.send('signin is ok')
  })
}
