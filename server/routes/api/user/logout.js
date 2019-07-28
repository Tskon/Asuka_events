module.exports = function (router, models, passport) {
  router.post('/user/logout', (req, res) => {
    req.logout()
    res.send({ status: 'ok' })
  })
}
