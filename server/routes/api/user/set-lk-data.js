module.exports = function (router, models) {
  router.post('/user/set-lk-data', async (req, res) => {
    await models.User.updateOne(
      { username: req.user.username },
      {
        clanTag: req.body.clanTag,
        clanName: req.body.clanName,
        avatar: req.body.imageUrl
      }
    )

    res.send({
      status: 'ok'
    })
  })
}
