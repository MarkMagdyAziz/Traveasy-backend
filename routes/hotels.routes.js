const express = require('express')
const router = express.Router();

const {getAll, postHotel, deletehotel, getById,editHotel , getHotelsByEvaluation, getHotelByName, getByCity} = require('../controllers/hotel.controller')

router.get('/', getAll)


router.get('/city', getByCity)
router.get('/rate', getHotelsByEvaluation)
router.get('/name', getHotelByName)


router.get('/:id', getById)

router.post('/', postHotel)

router.put('/:id', editHotel)

router.delete('/:id', deletehotel)

module.exports = { hotelsRouter: router };