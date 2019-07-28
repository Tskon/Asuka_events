module.exports = function (router, models) {
  router.post('/user/set-lk-data', (req, res) => {
    models.user_lk_data.findByPk(req.user.id)
      .then((userDataObject) => {
        if (userDataObject) {
          models.user_lk_data.update({
            clan_tag: req.body.clanTag,
            clan_name: req.body.clanName,
            image_url: req.body.imageUrl,
          }, {
            where: { user_id: req.user.id },
          })
        } else {
          models.user_lk_data.create({
            user_id: req.user.id,
            clan_tag: req.body.clanTag,
            clan_name: req.body.clanName,
            image_url: req.body.imageUrl,
          })
        }
      })
    res.send({
      status: 'ok',
    })
  })
}
