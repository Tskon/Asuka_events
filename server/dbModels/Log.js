const mongoose = require('mongoose')

const { Schema } = mongoose

const LogSchema = new Schema({
  eventSlug: String,
  turnNumber: Number,
  players: Array
})

module.exports = mongoose.model('Log', LogSchema)
