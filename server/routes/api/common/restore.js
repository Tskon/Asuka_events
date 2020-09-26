const bCrypt = require('bcrypt-nodejs')

const generateHash = (password) => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null)

module.exports = function (router, models) {
  router.post('/restore', (req, res) => {
    models.User.findOne({
      username: req.body.username
    }).then((data) => {
      if (bCrypt.compareSync(req.body.secret, data.secret)) {
        models.user.updateOne({username: data.username}, {
          password: generateHash(req.body.newPassword)
        })

        res.send({
          status: 'ok'
        })
      } else {
        res.send({ status: 'error', message: 'Неправильное секретное слово' })
      }
    })
  })
}
