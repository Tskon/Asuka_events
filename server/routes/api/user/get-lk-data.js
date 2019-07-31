module.exports = function (router, models) {
  router.post('/user/get-lk-data', (req, res) => {
    models.userLkData.findByPk(req.user.id)
      .then((userDataObject) => {
        if (userDataObject) {
          res.send({
            status: 'ok',
            data: {
              clanTag: userDataObject.clanTag,
              clanName: userDataObject.clanName,
              imageUrl: userDataObject.imageUrl,
            },
          })

          models.userLkData.update({
            clanTag: req.body.clanTag,
            clanName: req.body.clanName,
            imageUrl: req.body.imageUrl,
          }, {
            where: { user_id: req.user.id },
          })
        } else {
          models.userLkData.create({
            user_id: req.user.id,
            clanTag: req.body.clanTag,
            clanName: req.body.clanName,
            imageUrl: req.body.imageUrl,
          })
        }
      })
  })
}
