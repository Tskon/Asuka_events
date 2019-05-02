const express = require('express')
const passport = require('passport')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const models = require('./models/index')
const dbConfig = require('./db-config')

const PORT = process.env.PORT || 3000

const options = {
  host: dbConfig.dbOptions.host,
  port: dbConfig.dbOptions.port,
  user: dbConfig.dbUser,
  password: dbConfig.dbPassword,
  database: dbConfig.dbName,
}

const app = express()
app.use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(session({
    store: new MySQLStore(options),
    secret: 'asuka and ray',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 20 },
  }))
  .use(passport.initialize())
  .use(passport.session())

  // Serve the static files from the React app
  .use(express.static(path.resolve(__dirname, '../dist')))

  /**
   * Routes. use path /api + path in routes.
   * For example: /api/auth
   */
  .use('/api', require('./routes/api/index')(passport))

  /**
   * for all the react stuff
   */
  // .use(mustAuthenticated)
  .get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
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
