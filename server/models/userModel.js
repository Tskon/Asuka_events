const db = require('../database-worker/sequelize')

module.exports = function(){
  db.authenticate()
    .then(console.log('user model success'))
    .catch(console.log('user model error'))
}



// const schema = mongoose.Schema
//
// const photoModel = new schema({
//   tagline: { type: String} ,
//   image: { type: String},
//   likes: { type: String},
//   comments: { type: Array, default: [] }
// })
//
// module.exports = mongoose.model('photos', photoModel)