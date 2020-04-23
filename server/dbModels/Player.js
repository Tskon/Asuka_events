const mongoose = require('mongoose')

const {Schema} = mongoose

const PlayerSchema = new Schema({
  username: String,
  score: { type: Number, default: 0 },
  currentCellId: { type: String, default: '' },
  selectedCellId: { type: String, default: '' },
  ownedCellId: { type: String, default: '' }
})


module.exports = mongoose.model('Player', PlayerSchema)
