const bCrypt = require('bcrypt-nodejs')

module.exports = function (passport, user) {
  const User = user
  const LocalStrategy = require('passport-local').Strategy

  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true, // передаем изначальный запрос в колбэк
    },

    ((req, username, password, done) => {
      const generateHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null)

      User.findOne({
        where: {
          username,
        },
      }).then((user) => {
        if (user) {
          return done(null, false, {
            message: 'Данный логин занят',
          })
        }
        const userPassword = generateHash(password)
        const data = {
          username,
          password: userPassword,
        }

        User.create(data).then((newUser, created) => {
          if (!newUser) {
            return done(null, false)
          }
          if (newUser) {
            return done(null, newUser)
          }
        })
      })
    }),
  ))
}
