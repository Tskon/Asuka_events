module.exports = function (router, models, passport) {
  // TODO решить проблему с Error: Failed to serialize user into session
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/success',
    failureRedirect: '/failure',
    failureFlash: true,
  }))
}
