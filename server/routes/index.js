const express = require('express')
const router = express.Router()
const User = require('../models/userModel')

router.get('/user', (req, res) => {
  console.log('api user')
})


// router.get('/', (req, res) => {
  // User.find({}, (err, photos) => {
  //   res.json(photos)
  // })
// })
// router.use('/:id', (req, res, next) => {
//   console.log(req.params.id)
  // User.findById(req.params.id, (err, photo) => {
  //   if(err)
  //     res.status(500).send(err)
  //   else
  //     req.photo = photo
  //   next()
  // })
// })

// router
//   .get('/:id', (req, res) => {
//     return res.json( req.photo )
//   })
//   .put('/:id', (req, res) =>{
//     Object.keys(req.body).map(key=>{
//       req.photo[key] = req.body[key]
//     })
//     req.photo.save()
//     res.json(req.photo)
//   })




module.exports = router;