const mongoose = require('mongoose')

const { Schema } = mongoose

const LogSchema = new Schema({
  turnNumber: Number,
  Players: Array,
  Cells: Array
})

module.exports = mongoose.model('Log', LogSchema)
