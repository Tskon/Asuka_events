module.exports = function (router, models, passport) {
  models.sequelize.sync()
  router.post('/signup', passport.authenticate('local-signup'))
}
// TODO решить проблему POST http://localhost:3000/api/signup 404 (Not Found) в ответе: Cannot POST /api/signup