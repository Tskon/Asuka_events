const express = require ('express')
const next = require('next')
const sequelize = require('./database-worker/sequelize')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000
const dev = process.env.NODE_DEV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler() //part of next config


nextApp.prepare().then(() => {
  const app = express()
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.use('/api/photos', require('./routes/index'))
  app.get('*', (req,res) => {
    return handle(req,res) // for all the react stuff
  })
  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`ready at http://localhost:${PORT}`)
  })


  sequelize
    .authenticate()
    .then(()=>{
      console.log('All right! connection success')
    })
    .catch(err=>{
      console.error(new Date(),'error from sequelize', err)
    })

})