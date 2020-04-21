const bCrypt = require('bcrypt-nodejs')
const LocalStrategy = require('passport-local').Strategy

const generateHash = (password) => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null)

module.exports = function (passport, User) {
  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // передаем изначальный запрос в колбэк
    },

    (async (req, username, password, done) => {
      const user = await User.findOne({
        where: {
          username
        }
      })

      if (user) {
        return done(null, false, {
          message: 'Данный логин занят'
        })
      }

      const userPassword = generateHash(password)
      const userSecret = generateHash(req.body.secret)
      const data = {
        username,
        password: userPassword,
        secret: userSecret
      }

      const newUser = await User.create(data)
      if (!newUser) {
        return done(null, false)
      }
      return done(null, newUser)
    })
  ))

  passport.use('local-signin', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // передаем изначальный запрос в колбэк
    },

    ((req, username, password, done) => {
      User.findOne({
        where: {
          username
        }
      })
        .then((user) => {
          if (user && bCrypt.compareSync(password, user.password)) {
            return done(null, user)
          }
          return done(null, false, {
            message: 'Неверные имя пользователя или пароль'
          })
        })
    })
  ))

  passport.serializeUser(User.serializeUser())
  passport.deserializeUser(User.deserializeUser())

  // passport.serializeUser((user, done) => {
  //   done(null, user.id)
  // })
  //
  // passport.deserializeUser((id, done) => {
  //   User.findOne({
  //     where: {
  //       id
  //     }
  //   })
  //     .then((user) => {
  //       done(null, user)
  //     })
  // })
}
