const express = require('express')
const router = express.Router();

const {getAll, postHoliday, deleteholiday, getById,editHoliday, getHolidaysByEvaluation, getByCity } = require('../controllers/holidays.controller')

router.get('/', getAll)

router.get('/rate', getHolidaysByEvaluation)
router.get('/city', getByCity)


router.get('/:id', getById)

router.post('/', postHoliday)

router.put('/:id', editHoliday)

router.delete('/:id', deleteholiday)

module.exports = { holidaysRouter: router };