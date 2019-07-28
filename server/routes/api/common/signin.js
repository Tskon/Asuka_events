module.exports = function (router, models, passport) {
  router.post('/signin', passport.authenticate('local-signin'), (req, res) => {
    res.send({
      status: 'ok',
      data: {
        name: req.user.username,
        id: req.user.id,
        isAdmin: req.user.is_admin,
        isPlayer: req.user.is_player,
      },
    })
  })
}
