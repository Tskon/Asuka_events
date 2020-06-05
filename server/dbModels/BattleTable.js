const mongoose = require('mongoose')

const { Schema } = mongoose

const BattleTableSchema = new Schema({
  eventSlug: String,
  turnNumber: Number,
  cellName: String,
  players: Array,
  firstPair: {
    winner: String,
    looser: String
  },
  secondPair: {
    winner: String,
    looser: String
  },
  finalPair: {
    winner: String,
    looser: String
  }
})

module.exports = mongoose.model('BattleTable', BattleTableSchema)
