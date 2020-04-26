const mongoose = require('mongoose')

const { Schema } = mongoose

const LogSchema = new Schema({
  turnNumber: Number,
  players: Array,
  cells: Array
})

module.exports = mongoose.model('Log', LogSchema)
