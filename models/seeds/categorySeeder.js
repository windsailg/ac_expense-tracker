const category = require('../category')
const db = require('../../config/mongoose')
db.on('error', () => {
  console.log('mongoDB error！')
})
db.once('open', () => {
  category.create({
    name: '家居物業'
  },
  {
    name: '交通出行'
  },
  {
    name: '休閒娛樂'
  },
  {
    name: '餐飲食品'
  },
  {
    name: '其他'
  }
  )
  console.log('done.')
})
