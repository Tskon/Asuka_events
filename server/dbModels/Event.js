const mongoose = require('mongoose')

const { Schema } = mongoose

const EventSchema = new Schema({
  eventSlug: String,
  eventName: String,
  columns: Array,
  rows: Array,
  startedSectors: Array,
  bonusForWin: Number,
  richEconomyCells: {
    list: Array,
    bonus: Number
  },
  middleEconomyCells: {
    list: Array,
    bonus: Number
  },
  poorEconomyCells: {
    list: Array,
    bonus: Number
  },
  gameMapList: Array
})

module.exports = mongoose.model('Event', EventSchema)
