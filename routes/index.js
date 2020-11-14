const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const record = require('./modules/expense')
const users = require('./modules/user')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

router.use('/search', authenticator, record)
router.use('/record', authenticator, record)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router
