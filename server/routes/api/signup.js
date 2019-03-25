module.exports = function (router, models, passport) {
  models.sequelize.sync()
  router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
    res.send('signup and auth are ok')
  })
}