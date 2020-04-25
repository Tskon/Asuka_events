const mongoose = require('mongoose')

const {Schema} = mongoose

const PlayerSchema = new Schema({
  username: String,
  score: { type: Number, default: 0 },
  currentCell: { type: String, default: '' },
  selectedCell: { type: String, default: '' },
  ownedCell: { type: String, default: '' },
  ownInRowCount: { type: Number, default: 0 }
})


module.exports = mongoose.model('Player', PlayerSchema)
