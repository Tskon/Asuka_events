module.exports = function (router, models, passport) {
  models.sequelize.sync()
  router.post('/signup', passport.authenticate('local-signup'))
}
