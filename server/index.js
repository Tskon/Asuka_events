const express = require('express')
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const models = require('./models/index')
const RedisStore = require('connect-redis')(express);

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(session({
  store: new RedisStore(),
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 1000,
    httpOnly: false,
  },
  secret: 'asuka_and_ray',
}))
app.use(passport.initialize())
app.use(passport.session())

// Serve the static files from the React app
app.use(express.static(path.resolve(__dirname, '../dist')))

/**
 * Routes. use path /api + path in routes.
 * For example: /api/auth
 */
app.use('/api', require('./routes/api/index')(passport))

/**
 * for all the react stuff
 */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})

app.post('*', (req, res) => {
  res.send({ status: 'failed!' })
})

/**
 * Load passport strategies
 *
 */
require('./passport/passport.js')(passport, models.user)

/**
 * Sync with database
 */
models.sequelize.sync()
  .then(() => {
    console.log('Nice! Database looks fine')
  })
  .catch((err) => {
    console.log(err, 'Something went wrong with the Database Update!')
  })

/**
 * Listening port by express
 */
app.listen(PORT, (err) => {
  if (err) throw err
  console.log(`ready at http://localhost:${PORT}`)
})
