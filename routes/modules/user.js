const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const userModel = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!email || !password) {
      return res.render('login', { warning_msg: '請確認必填欄位的資訊是否填寫' })
    }
    if (!user) {
      return res.render('login', { warning_msg: '請確認填入的資料是否正確' })
    }
    req.logIn(user, () => {
      req.flash('warning_msg', '已成功登入')
      return res.redirect('/')
    })
  })(req, res, next)
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '電子郵件及密碼為必填欄位！' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  userModel.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已被註冊！' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10) 
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => userModel.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '已經成功登出')
  res.redirect('/users/login')
})

module.exports = router
