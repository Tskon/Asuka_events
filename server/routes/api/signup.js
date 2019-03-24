module.exports = function (router, models, passport) {
  // router.post('/signup', passport.authenticate('local-signup', {
  //   successRedirect: '/success-signup',
  //   failureRedirect: '/fail-signup',
  // }))
  router.post('/signup', (req, res) => {
    // TODO переделать поиск по введенным данным, а не всех пользователей
    console.log('req body: ', req.body)

    models.user.findAll()
      .then((answer) => {
        // Если пользователя нет, то создаем нового
        console.log('====== num of users ======',answer.length)
        if (answer.length === 0) {
          models.user.create({
            username: req.body.login,
            password: req.body.password,
          })

          res.end('registration success')
        }
        res.end('registration failed')
      })
  })
}
