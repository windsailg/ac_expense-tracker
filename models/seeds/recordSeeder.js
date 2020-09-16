const record = require('../record')
const db = require('../../config/mongoose')
db.on('error', () => {
  console.log('mongoDB error！')
})
db.once('open', () => {
  record.create({
    name: '火鍋',
    category: '餐飲食品',
    date: '2019.04.23',
    amount: '638'
  },
  {
    name: '房租',
    category: '家居物業',
    date: '2019.04.23',
    amount: '3000'
  },
  {
    name: '捷運',
    category: '交通出行',
    date: '2019.04.23',
    amount: '60'
  },
  {
    name: '電子遊樂場',
    category: '休閒娛樂',
    date: '2019.04.23',
    amount: '1200'
  },
  {
    name: '賞鳥',
    category: '其他',
    date: '2019.04.23',
    amount: '780'
  }
  )
  console.log('done.')
})
