module.exports = function (router, models, passport) {
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/success',
    failureRedirect: '/failure',
    failureFlash: true,
  }))
}
