module.exports = function (router, models, passport) {
  router.post('/logout', (req, res) => {
    req.logout()
    res.send({ status: 'ok' })
  })
}
