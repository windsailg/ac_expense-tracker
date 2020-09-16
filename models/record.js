const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: false
  },
  amount: {
    type: String,
    required: false
  },
  totalAmount: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('record', recordSchema)
