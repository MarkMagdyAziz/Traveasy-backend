const express = require('express')
const router = express.Router();

const {getAll,getLimit, postHotel, deletehotel, getById,editHotel , getHotelsByEvaluation, getHotelByName,getHotelsByPrice, getByCity} = require('../controllers/hotel.controller')

router.get('/', getAll)

router.get('/limit', getLimit)

router.get('/city', getByCity)

router.get('/rate', getHotelsByEvaluation)
router.get('/name', getHotelByName)
router.get('/price', getHotelsByPrice)


router.get('/:id', getById)

router.post('/', postHotel)

router.put('/:id', editHotel)

router.delete('/:id', deletehotel)

module.exports = { hotelsRouter: router };