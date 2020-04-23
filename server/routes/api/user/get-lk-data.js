module.exports = function (router, models) {
  router.post('/user/get-lk-data', (req, res) => {
    models.User.findOne(req.user.name)
      .then((userDataObject) => {
        if (userDataObject && (req.user.isPlayer)) {
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
            message: 'Нет прав игрока',
            goTo: '/'
          })
        }
      })
  })
}
