require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  const kittySchema = new mongoose.Schema({
    name: String
  })

  kittySchema.methods.speak = () => {
    console.log((this.name) ? `Meow name is ${this.name}` : 'I don`t have a name')
  }

  const Kitten = mongoose.model('Kitten', kittySchema)
  const silence = new Kitten({ name: 'Silence' })
  silence.speak()

  // silence.save((err, kitty) => {
  //   if (err) console.warn(err)
  //   console.log(kitty)
  //   silence.speak()
  // })

  Kitten.find({ name: /len/ },(err, kittens) => {
    if (err) return console.log(err)
    console.log(kittens)
  })
})
