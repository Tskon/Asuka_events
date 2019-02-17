module.exports = function(router, models){
  router.get('/signup', (req, res) => {
    res.send('Answer from /signup route')
  })
}
