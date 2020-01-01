module.exports = function (router) {
  router.post('/user/get-user', (req, res) => {
    res.send({
      status: 'ok',
      data: {
        name: req.user.username,
        id: req.user.id,
        isAdmin: req.user.isAdmin,
        isPlayer: req.user.isPlayer
      }
    })
  })
}
