const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const {Schema} = mongoose

const defaultAvatar = 'https://listimg.pinclipart.com/picdir/s/115-1150177_info-navy-ship-svg-files-clipart.png'

const UserSchema = new Schema({
  username: String,
  password: String,
  clanTag: { type: String, default: 'UKNWN' },
  clanName: { type: String, default: 'Unknown' },
  secret: String,
  isAdmin: { type: Boolean, default: false },
  avatar: { type: String, default: defaultAvatar }
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)
