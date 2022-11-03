const express = require('express')
const router = express.Router();

const {getAll,getHotelById, postBookedHotel , deleteBookedHotel,editBookedHotel , getBookedByDate} = require('../controllers/bookedHotels.controller')

router.get('/', getAll)

//get data by date
router.get('/date_range', getBookedByDate )

router.get('/:id', getHotelById)

router.post('/', postBookedHotel)

router.put('/:id',editBookedHotel)

router.delete('/:id',deleteBookedHotel)




module.exports = { bookedHotelsRouter: router };