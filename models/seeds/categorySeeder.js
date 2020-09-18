const category = require('../category')
const db = require('../../config/mongoose')
db.on('error', () => {
  console.log('mongoDB error！')
})
db.once('open', () => {
  category.create({
    name: '家居物業',
    tag: 'fas fa-home'
  },
  {
    name: '交通出行',
    tag: 'fas fa-shuttle-van'
  },
  {
    name: '休閒娛樂',
    tag: 'fas fa-grin-beam'
  },
  {
    name: '餐飲食品',
    tag: 'fas fa-utensils'
  },
  {
    name: '其他',
    tag: 'fas fa-pen'
  }
  )
  console.log('done.')
})
