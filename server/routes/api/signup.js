module.exports = function (router, models, passport) {
  // TODO решить проблему с Error: Failed to serialize user into session
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/success',
    failureRedirect: '/failure',
    failureFlash: true,
  }))

  // models.sequelize
  //   .sync()
  //   .then(() => {
  //     models.user.findOne({
  //       where: { username: req.body.username },
  //     })
  //       .then((answer) => {
  //         // Если пользователя нет, то создаем нового
  //         if (answer === null) {
  //           models.user.create({
  //             username: req.body.username,
  //             password: req.body.password,
  //           })
  //
  //           res.end('registration success')
  //         }
  //         res.end('registration failed')
  //       })
  //   })
}
