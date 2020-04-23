const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const {Schema} = mongoose

const UserSchema = new Schema({
  username: String,
  password: String,
  secret: String,
  isPlayer: Boolean,
  isAdmin: Boolean
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)
