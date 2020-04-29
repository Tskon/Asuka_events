const mongoose = require('mongoose')

const { Schema } = mongoose

const BattleTableSchema = new Schema({
  turnNumber: Number,
  cellName: String,
  players: Array,
  firstPair: {
    winner: {
      username: String,
      clanTag: String,
      clanName: String,
      avatar: String
    },
    looser: {
      username: String,
      clanTag: String,
      clanName: String,
      avatar: String
    }
  },
  secondPair: {
    winner: {
      username: String,
      clanTag: String,
      clanName: String,
      avatar: String
    },
    looser: {
      username: String,
      clanTag: String,
      clanName: String,
      avatar: String
    }
  },
  finalPair: {
    winner: {
      username: String,
      clanTag: String,
      clanName: String,
      avatar: String
    },
    looser: {
      username: String,
      clanTag: String,
      clanName: String,
      avatar: String
    }
  }
})

module.exports = mongoose.model('BattleTable', BattleTableSchema)
