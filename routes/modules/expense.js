const express = require('express')
const router = express.Router()

const records = require('../../models/record')
const categories = require('../../models/category')

// search
router.get('/', (req, res) => {
  const filterTarget = req.query.filterCategory
  records.find()
    .lean()
    .then(record => {

      let filteredRecordArr = record.filter(item => {
        return item.category === filterTarget
      })
      if (filterTarget === '依照類別搜尋') filteredRecordArr = record
      let filteredAmount = Number()
      filteredRecordArr.forEach(item => {
        filteredAmount += Number(item.amount)
      })

      categories.find()
        .lean()
        .then(category => {
          const newCategory = []
          category.forEach(item => {
            newCategory.push(item)
          })
          return res.render('index', {
            record: filteredRecordArr,
            category: newCategory,
            totalAmount: filteredAmount.toLocaleString('zh-TW', { currency: 'TWD' }),
            filterTarget
          })
        })
    })
    .catch(error => console.error(error))
})

// new
router.get('/new', (req, res) => {
  categories.find()
    .lean()
    .then(category => res.render('new', { category }))
})

// create new post
router.post('/', (req, res) => {
  let { name, category, date, amount } = req.body
  if (!name.trim()) name = '未命名的支出'
  if (!amount.trim()) amount = '0'
  let categoryArr = []
  categoryArr = categoryArr.concat(category.split(','))
  return records.create({
    name: name,
    category: categoryArr[0],
    date: date,
    amount: amount,
    tag: categoryArr[1]
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// edit
router.get('/:record_id/edit', (req, res) => {
  const id = req.params.record_id
  return records.findById(id)
    .lean()
    .then(record => {
      categories.find()
        .lean().then(categoryItem => {
          const newCategories = categoryItem.filter(ele => ele.name !== record.category)
          res.render('edit', { record, categories: newCategories })
        })
    })
    .catch(error => console.log(error))
})

// edit put
router.put('/:record_id', (req, res) => {
  const id = req.params.record_id
  let { name, category, date, amount } = req.body
  if (!name.trim()) name = '未命名的支出'
  if (!amount.trim()) amount = '0'
  let categoryArr = []
  categoryArr = categoryArr.concat(category.split(','))
  return records.findById(id)
    .then(record => {
      record.name = name
      record.category = categoryArr[0]
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
  const id = req.params.record_id
  return records.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
