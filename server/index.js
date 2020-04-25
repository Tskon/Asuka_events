require('dotenv').config()
const cors = require('cors')
const path = require('path')
const express = require('express')
const passport = require('passport')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const models = require('./dbModels')

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('connection successful')
  })
  .catch((err) => {console.log(err)})

const app = express()
app
  .use(cors())
  .use(fileUpload({ createParentPath: true }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 7 суток живут сессии
    store : new MongoStore({
      url: process.env.MONGO_SESSIONS_URL
    })
  }))
  .use(passport.initialize())
  .use(passport.session())

  // Serve the static files from the React app
  .use(express.static(path.resolve(__dirname, '../dist')))

  /**
   * Routes. use path /api + path in routes.
   * For example: /api/auth
   */
  .use('/api/user', (req, res, next) => {
    if (req.isAuthenticated()) next()
    else res.send({ status: 'error', message: 'Вы не авторизованы. User' })
  })
  .use('/api/admin', (req, res, next) => {
    if (req.user && req.user.isAdmin) next()
    else res.send({ status: 'error', message: 'Не достаточно прав. Admin' })
  })
  .use('/api/map', (req, res, next) => {
    if (req.user && (req.user.isAdmin || req.user.isPlayer)) next()
    else res.send({ status: 'error', message: 'Не достаточно прав. Player' })
  })
  .use('/api', require('./routes/api/index')(passport, app))

  /**
   * for all the react stuff
   */
  .get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
  })

require('./passport/passport.js')(passport, models.User)

require('./dbInitData/mapCells')(models)
require('./dbInitData/users')(models)
require('./dbInitData/mapTurnsData')(models)

/**
 * Listening port by express
 */
const PORT = process.env.PORT || 12345
app.listen(PORT, (err) => {
  if (err) throw err
  console.log(`ready at http://localhost:${PORT}`)
})
