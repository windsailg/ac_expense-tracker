const express = require('express')
const router = express.Router()

const recordModel = require('../../models/record')
const categoryModel = require('../../models/category')

router.use(express.static('public'))

router.get('/', (req, res) => {
  const userId = req.user._id
  recordModel.find({ userId })
    .lean()
    .sort({ name: 'asc' })
    .then(record => {
      let totalAmount = Number()
      record.forEach(item => {
        totalAmount += Number(item.amount)
      })
      categoryModel.find()
        .lean()
        .then(category => {
          // filter list
          const filterMonthList = []
          let count = 1
          while (count <= 12) {
            filterMonthList.push(count + '月')
            count++
          }
          return res.render('index', {
            record,
            category,
            month: filterMonthList,
            totalAmount: totalAmount.toLocaleString('zh-TW', { currency: 'TWD' })
          })
        })
    })
    .catch(error => console.error(error))
})

module.exports = router
