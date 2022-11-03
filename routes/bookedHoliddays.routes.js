const express = require('express')
const router = express.Router();

const {getAll, postBookedHoliday , deleteBookedHoliday, getById,editBookedHoliday, getBookedByDate } = require('../controllers/bookedHolidays.controller')

router.get('/', getAll)

//get data by date
router.get('/date_range', getBookedByDate )
router.get('/:id', getById)

router.post('/', postBookedHoliday)

router.put('/:id',editBookedHoliday)

router.delete('/:id',deleteBookedHoliday)

module.exports = { bookedHolidaysRouter: router };