const bCrypt = require('bcrypt-nodejs')

const generateHash = (password) => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null)

module.exports = function (router, models) {
  router.post('/restore', (req, res) => {
    models.user.findOne({
      where: { username: req.body.username }
    }).then((data) => {
      if (bCrypt.compareSync(req.body.secret, data.secret)) {
        models.user.update({
          password: generateHash(req.body.newPassword)
        }).where({ id: data.id })

        res.send({
          status: 'ok'
        })
      } else {
        res.send({ status: 'error', message: 'Неправильное секретное слово' })
      }
    })
  })
}
