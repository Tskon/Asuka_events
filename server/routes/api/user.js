module.exports = function(router, models){
  router.get('/user', (req, res) => {
    console.log('api user', req, res)

    /**
     * Connect to database
     */
    models.sequelize
      .sync()
      .then(() => {
        console.log('All right! connection success')
      })
      .catch(err => {
        console.error(new Date(), 'error from sequelize', err)
      })

    res.send('Answer from /user route')
  })
}


