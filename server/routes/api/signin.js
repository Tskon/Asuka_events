module.exports = function (router, models, passport) {
  router.post('/signin', (req, res) => {
    // TODO переделать поиск по введенным данным, а не всех пользователей
    console.log('req body: ', req.body)

    models.sequelize
      .sync()
      .then(() => {
        models.user.findOne({
          where: { username: req.body.username },
        })
          .then((answer) => {
            // Если пользователя нет, то создаем нового
            if (answer === null) {
              models.user.create({
                username: req.body.username,
                password: req.body.password,
              })

              res.end('registration success')
            }
            res.end('registration failed')
          })
      })

  })
}
