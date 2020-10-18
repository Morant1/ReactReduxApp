const express = require('express')
const {requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getToy, getToys, deleteToy, updateToy,addToy} = require('./toy.controller')
const router = express.Router()


router.get('/', getToys)
router.get('/:id', getToy)
router.put('/:id',requireAdmin, updateToy)
router.post('/',requireAdmin, addToy)
router.delete('/:id',requireAdmin, deleteToy)

module.exports = router
