const express = require('express')
const router = express.Router()

const records = require('../../models/record')
const categories = require('../../models/category')

router.use(express.static('public'))

router.get('/', (req, res) => {
  records.find()
    .lean()
    .sort({ name: 'asc' })
    .then(record => {
      let totalAmount = Number()
      record.forEach(item => {
        totalAmount += Number(item.amount)
      })
      categories.find()
        .lean()
        .then(category => {
          const newCategory = []
          category.forEach(item => {
            newCategory.push(item)
          })
          return res.render('index', { record, category: newCategory, totalAmount })
        })
    })
    .catch(error => console.error(error))
})

module.exports = router
