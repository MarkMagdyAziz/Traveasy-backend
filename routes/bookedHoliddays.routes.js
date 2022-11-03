const express = require('express')
const router = express.Router();

const {getAll, postBookedHoliday  ,deleteBookedHoliday, getById,editBookedHoliday, getBookedByDate, getAggr } = require('../controllers/bookedHolidays.controller')

router.get('/', getAll)


// get total price
router.get('/agg', getAggr)

//get data by date
router.get('/date_range', getBookedByDate )

router.get('/:id', getById)

router.post('/', postBookedHoliday)

router.put('/:id',editBookedHoliday)

router.delete('/:id',deleteBookedHoliday)

module.exports = { bookedHolidaysRouter: router };