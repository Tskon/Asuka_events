module.exports = function (router, models, passport) {
  router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
    res.send({
      status: 'ok',
      data: {
        name: req.user.username,
        id: req.user.id,
        isAdmin: req.user.isAdmin,
        isPlayer: req.user.isPlayer,
      },
    })
  })
}
