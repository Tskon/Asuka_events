const mongoose = require('mongoose')

const { Schema } = mongoose

const TurnSchema = new Schema({
  number: Number,
  fog: Boolean,
  type: { type: String, default: 'common' }
})

module.exports = mongoose.model('TurnType', TurnSchema)
