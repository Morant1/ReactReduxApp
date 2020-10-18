const express = require('express')
const {getBranches} = require('./branch.controller')
const router = express.Router()


router.get('/', getBranches)

module.exports = router
