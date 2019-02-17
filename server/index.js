const express = require ('express')
const next = require('next')
const models = require('./models/index')
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const env = require('dotenv').load();

const PORT = process.env.PORT || 3000
const dev = process.env.NODE_DEV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()


nextApp.prepare().then(() => {
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(session({ secret: 'asuka and ray',resave: true, saveUninitialized:true}))
  app.use(passport.initialize())
  app.use(passport.session())

  /**
   * Routes. use path /api + path in routes.
   * For example: /api/auth
   */
  app.use('/api', require('./routes'))

  app.get('*', (req,res) => {
    return handle(req,res) // for all the react stuff
  })

  /**
   * Load passport strategies
   */
  require('./passport/passport.js')(passport, models.user);

  /**
   * Sync with database
   */
  models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
  }).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
  });

  /**
   * Listening port by express
   */
  app.listen(PORT, err => {
    if (err) throw err
    console.log(`ready at http://localhost:${PORT}`)
  })

})