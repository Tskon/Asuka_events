module.exports = function (router, models, passport) {
  router.post('/logout', (req, res) => {
    console.log('== logout ==', req.user)
    req.logout()
    res.send({ status: 'ok' })
  })
}
