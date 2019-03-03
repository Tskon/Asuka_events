module.exports = function (router, modules, passport) {
  /**
   * TODO разобраться как прокинуть passport чтобы работала authenticate
   */
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/success-signup',
    failureRedirect: '/fail-signup',
  }))
}
