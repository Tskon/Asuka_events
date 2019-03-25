const bCrypt = require('bcrypt-nodejs')

const generateHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null)

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

  passport.use('local-signin', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true, // передаем изначальный запрос в колбэк
    },

    ((req, username, password, done) => {
      const userPassword = generateHash(password)
      User.findOne({
        where: {
          username,
          password: userPassword,
        },
      }).then((user) => {
        if (!user) {
          return done(null, false, {
            message: 'Успешный вход',
          })
        }
        return done(null, false, {
          message: 'Неверные имя пользователя или пароль',
        })
      })
    }),
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findByPk(id, (err, user) => {
      done(err, user)
    })
  })
}
