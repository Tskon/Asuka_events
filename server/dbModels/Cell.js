const mongoose = require('mongoose')

const { Schema } = mongoose

const CellSchema = new Schema({
  name: String,
  connectedCells: Array,
  started: Boolean,
  gameMap: String,
  bonus: { type: Number, default: 0 }
})

module.exports = mongoose.model('Cell', CellSchema)
