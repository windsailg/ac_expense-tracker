const express = require('express')
const router = express.Router()

const recordModel = require('../../models/record')
const categoryModel = require('../../models/category')

// search
router.get('/', (req, res) => {
  const userId = req.user._id
  const filterCategory = req.query.category
  const filterMonth = req.query.month
  const formState = 'show'
  // npm install standard --global
  console.log(filterMonth)
  recordModel.find({ userId })
    .lean()
    .then(records => {
      // filter result
      let filteredRecordArr = []
      let filterCategoryArr = []
      const infos = []
      filterCategoryArr = records.filter(record => {
        let dateTarget
        const recordDate = new Date(record.date).getMonth() + 1
        if (filterMonth.length === 3) {
          dateTarget = filterMonth.slice(0, 2)
        } else {
          dateTarget = filterMonth.slice(0, 1)
        }
        if (filterCategory === '類別') {
          console.log(recordDate, dateTarget)
          return String(recordDate) === dateTarget
        } else if (filterMonth === '月份') {
          return record.category === filterCategory
        }
        return record.category === filterCategory && String(recordDate) === dateTarget
      })
      filteredRecordArr = filterCategoryArr
      if (!filteredRecordArr.length) {
        infos.push({ message: '查詢無結果' })
      }

      // filter amount block
      let filteredAmount = Number()
      filteredRecordArr.forEach(record => {
        filteredAmount += Number(record.amount)
      })
      categoryModel.find()
        .lean()
        .then(categories => {
          // filter list
          const filterMonthList = []
          let count = 1
          while (count <= 12) {
            filterMonthList.push(count + '月')
            count++
          }
          const newCategories = categories.filter(category => category.name !== filterCategory)
          const newMonth = filterMonthList.filter(month => month !== filterMonth)
          return res.render('index', {
            infos,
            formState,
            record: filteredRecordArr,
            category: newCategories,
            month: newMonth,
            totalAmount: filteredAmount.toLocaleString('zh-TW', { currency: 'TWD' }),
            filterCategory,
            filterMonth,
            filterCategoryVal: filterCategory,
            filterMonthVal: filterMonth
          })
        })
    })
    .catch(error => console.error(error))
})

// new
router.get('/new', (req, res) => {
  categoryModel.find()
    .lean()
    .then(category => {
      req.flash('warning_msg', '已成功新增')
      return res.render('new', { category })
    })
})

// post new
router.post('/', (req, res) => {
  const userId = req.user._id
  let { name, category, merchant, date, amount } = req.body
  if (!name.trim()) name = '未命名的支出'
  if (!amount.trim()) amount = '0'
  let categoryArr = []
  categoryArr = categoryArr.concat(category.split(','))
  return recordModel.create({
    name,
    category: categoryArr[0],
    merchant,
    date,
    amount,
    tag: categoryArr[1],
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// edit
router.get('/:record_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.record_id
  return recordModel.findOne({ _id, userId })
    .lean()
    .then(record => {
      categoryModel.find()
        .lean()
        .then(categoryItem => {
          const newCategories = categoryItem.filter(ele => ele.name !== record.category)
          res.render('edit', { record, categories: newCategories })
        })
    })
    .catch(error => console.log(error))
})

// post edit
router.put('/:record_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.record_id
  let { name, category, merchant, date, amount } = req.body
  if (!name.trim()) name = '未命名的支出'
  // if (!merchant.trim()) merchant = ''
  if (!amount.trim()) amount = '0'
  let categoryArr = []
  categoryArr = categoryArr.concat(category.split(','))
  return recordModel.findOne({ _id, userId })
    .then(record => {
      record.name = name
      record.category = categoryArr[0]
      record.merchant = merchant
      record.date = date
      record.amount = amount
      record.tag = categoryArr[1]
      return record.save()
    })
    .then(() => {
      return res.redirect('/')
    })
    .catch(error => console.error(error))
})

// delete
router.delete('/:record_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.record_id
  return recordModel.findOne({ _id, userId })
    .then(records => records.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
