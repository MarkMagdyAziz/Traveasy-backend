const express = require('express')
const router = express.Router();

const {getAll, postBookedHoliday , deleteBookedHoliday, getById,editBookedHoliday } = require('../controllers/bookedHolidays.controller')

router.get('/', getAll)
router.get('/:id', getById)

router.post('/', postBookedHoliday)

router.put('/:id',editBookedHoliday)

router.delete('/:id',deleteBookedHoliday)

module.exports = { bookedHolidaysRouter: router };