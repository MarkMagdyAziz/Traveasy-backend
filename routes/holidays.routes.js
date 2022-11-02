const express = require('express')
const router = express.Router();

const {getAll, postHoliday, deleteholiday, getById,editHoliday } = require('../controllers/holidays.controller')

router.get('/', getAll)
router.get('/:id', getById)

router.post('/', postHoliday)

router.put('/:id', editHoliday)

router.delete('/:id', deleteholiday)

module.exports = { holidaysRouter: router };