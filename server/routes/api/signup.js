module.exports = function (router, models, passport) {
  // router.post('/signup', passport.authenticate('local-signup', {
  //   successRedirect: '/success-signup',
  //   failureRedirect: '/fail-signup',
  // }))
  router.post('/signup', (req, res) => {
    // TODO переделать поиск по введенным данным, а не всех пользователей
    console.log('req body: ', req.body)

    models.sequelize
      .sync()
      .then(() => {
        models.user.findOne({
          where: { username: req.body.login },
        })
          .then((answer) => {
            // Если пользователя нет, то создаем нового
            if (answer === null) {
              models.user.create({
                username: req.body.login,
                password: req.body.password,
              })

              res.end('registration success')
            }
            res.end('registration failed')
          })
      })

  })
}
