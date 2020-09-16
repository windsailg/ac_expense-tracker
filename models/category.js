const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('category', categorySchema)
