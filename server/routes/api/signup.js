module.exports = function (router, modules, passport) {
  // router.post('/signup', passport.authenticate('local-signup', {
  //   successRedirect: '/success-signup',
  //   failureRedirect: '/fail-signup',
  // }))
  router.post('/signup', (req, res) => {
    // TODO переделать поиск по введенным данным, а не всех пользователей
    console.log('req body: ', req.body)
    modules.user.findAll()
      .then((answer) => {
        // Если пользователя нет, то создаем нового
        if (answer.length === 0) {

        }
      })
  })
}
