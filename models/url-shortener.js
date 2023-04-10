const mongoose = require('mongoose')
const Schema = mongoose.Schema
const URLshortenerSchema = new Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String, 
    required: true
  }
})

module.exports = mongoose.model('URLShortener', URLshortenerSchema)