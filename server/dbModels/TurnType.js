const mongoose = require('mongoose')

const { Schema } = mongoose

const TurnSchema = new Schema({
  turnNumber: Number,
  fog: Boolean,
  type: { type: String, default: 'common' }
})

module.exports = mongoose.model('TurnType', TurnSchema)
