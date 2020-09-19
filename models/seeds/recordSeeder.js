const record = require('../record')
const db = require('../../config/mongoose')
db.on('error', () => {
  console.log('mongoDB error！')
})
db.once('open', () => {
  record.create({
    name: '火鍋',
    category: '餐飲食品',
    date: '2019-04-23',
    amount: '638',
    tag: 'fas fa-utensils'
  },
  {
    name: '房租',
    category: '家居物業',
    date: '2019-04-23',
    amount: '3000',
    tag: 'fas fa-home'
  },
  {
    name: '機票',
    category: '交通出行',
    date: '2020-04-13',
    amount: '14000',
    tag: 'fas fa-shuttle-van'
  },
  {
    name: '電子遊藝場',
    category: '休閒娛樂',
    date: '2009-02-16',
    amount: '1200',
    tag: 'fas fa-grin-beam'
  },
  {
    name: '賞鳥',
    category: '其他',
    date: '2019-04-23',
    amount: '700',
    tag: 'fas fa-pen'
  },
  {
    name: '買菸',
    category: '休閒娛樂',
    date: '2019-04-23',
    amount: '780',
    tag: 'fas fa-grin-beam'
  }
  )
  console.log('done.')
})
