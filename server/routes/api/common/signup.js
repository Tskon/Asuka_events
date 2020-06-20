module.exports = function (router, models, passport) {
  router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
    res.send({
      status: 'ok',
      data: {
        name: req.user.username,
        isAdmin: req.user.isAdmin
      }
    })
  })
}
