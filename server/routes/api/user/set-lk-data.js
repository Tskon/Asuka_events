module.exports = function (router, models) {
  router.post('/user/set-lk-data', (req, res) => {
    models.userLkData.findByPk(req.user.id)
      .then((userDataObject) => {
        if (userDataObject) {
          models.userLkData.update({
            clanTag: req.body.clanTag,
            clanName: req.body.clanName,
            imageUrl: req.body.imageUrl
          }, {
            where: { userId: req.user.id }
          })
        } else {
          models.userLkData.create({
            userId: req.user.id,
            clanTag: req.body.clanTag,
            clanName: req.body.clanName,
            imageUrl: req.body.imageUrl
          })
        }
      })
    res.send({
      status: 'ok'
    })
  })
}
