const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const record = require('./modules/record')

router.use('/', home)
router.use('/search', record)
router.use('/record', record)

module.exports = router
