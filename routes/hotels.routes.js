const express = require('express')
const router = express.Router();

const {getAll, postHotel, deletehotel, getById,editHotel } = require('../controllers/hotel.controller')

router.get('/', getAll)
router.get('/:id', getById)

router.post('/', postHotel)

router.put('/:id', editHotel)

router.delete('/:id', deletehotel)

module.exports = { hotelsRouter: router };