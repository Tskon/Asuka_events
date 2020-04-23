module.exports = function (router) {
  router.post('/user/get-user', (req, res) => {
    const user = req.user || {}
    res.send({
      status: 'ok',
      data: {
        name: user.username,
        isAdmin: user.isAdmin,
        isPlayer: user.isPlayer
      }
    })
  })
}
