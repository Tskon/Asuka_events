module.exports = function (router, models) {
  router.post('/user/get-lk-data', (req, res) => {
    if (!req.user || !req.user.isPlayer) {
      return res.send({
        status: 'error',
        message: 'Нет прав игрока',
        goTo: '/'
      })
    }

    models.User.findOne(req.user.username)
      .then((userDataObject) => {
        if (userDataObject) {
          res.send({
            status: 'ok',
            data: {
              clanTag: userDataObject.clanTag,
              clanName: userDataObject.clanName,
              imageUrl: userDataObject.imageUrl
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
