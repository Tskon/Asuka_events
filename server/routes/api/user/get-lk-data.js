module.exports = function (router, models) {
  router.post('/user/get-lk-data', (req, res) => {
    models.User.findOne({ username: req.user.username }, (err, user) => {
      if (user) {
        res.send({
          status: 'ok',
          data: {
            clanTag: user.clanTag,
            clanName: user.clanName,
            imageUrl: user.avatar
          }
        })
      } else {
        res.send({
          status: 'error',
          message: 'Не найден пользователь',
          goTo: '/'
        })
      }
    })
  })
}
