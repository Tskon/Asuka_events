module.exports = function (router) {
  router.post('/user/logout', (req, res) => {
    req.logout()
    res.send({ status: 'ok' })
  })
}
