module.exports = function (router, models, passport) {
  models.sequelize.sync()
  router.post('/signin', passport.authenticate('local-signin'), (req, res) => {
    res.send('signin is ok')
  })
}
