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
      // const categoryArr = []
      // record.forEach(item => {
      //   categoryArr.push(item.category)
      // })
      return res.render('index', { record, categories })
    })
    .catch(error => console.error(error))
})

module.exports = router
