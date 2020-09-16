const express = require('express')
const router = express.Router()

const records = require('../../models/record')
// const categories = require('../../models/category')
router.use(express.static('public'))

router.get('/', (req, res) => {
  records.find()
    .lean()
    .sort({ name: 'asc' })
    .then(record => {
      const categoryArr = []
      const areaArr = []
      record.forEach(item => {
        categoryArr.push(item.category)
        areaArr.push(item.area)
      })
      const categories = categoryArr.filter((ele, index, thisArr) => {
        return thisArr.indexOf(ele) === index
      })
      const areas = areaArr.filter((ele, index, thisArr) => {
        return thisArr.indexOf(ele) === index
      })
      return res.render('index', { record, categories, areas })
    })
    .catch(error => console.error(error))
})

module.exports = router
