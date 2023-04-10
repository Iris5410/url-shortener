const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortenerSchema = new Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String, 
    required: true
  }
})

module.exports = mongoose.model('Shortener', shortenerSchema)