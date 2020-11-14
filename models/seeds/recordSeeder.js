
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const recordModel = require('../record')
const userModel = require('../user')

const db = require('../../config/mongoose')

const SEED_USER_1 = {
  name: 'Father',
  email: 'imfather@123.tw',
  password: '123'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER_1.password, salt))
    .then(hash => userModel.create({
      name: SEED_USER_1.name,
      email: SEED_USER_1.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from({ length: 1 },
        (_, i) => recordModel.create({
          name: '火鍋',
          category: '餐飲食品',
          date: '2019-04-23',
          amount: '638',
          tag: 'fas fa-utensils',
          userId
        }, {
          name: '房租',
          category: '家居物業',
          date: '2019-04-23',
          amount: '3000',
          tag: 'fas fa-home',
          userId
        }, {
          name: '機票',
          category: '交通出行',
          date: '2020-04-13',
          amount: '14000',
          tag: 'fas fa-shuttle-van',
          userId
        }, {
          name: '電子遊藝場',
          category: '休閒娛樂',
          date: '2009-02-16',
          amount: '1200',
          tag: 'fas fa-grin-beam',
          userId
        }, {
          name: '賞鳥',
          category: '其他',
          date: '2019-04-23',
          amount: '700',
          tag: 'fas fa-pen',
          userId
        }, {
          name: '買菸',
          category: '休閒娛樂',
          date: '2019-04-23',
          amount: '780',
          tag: 'fas fa-grin-beam',
          userId
        })))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
