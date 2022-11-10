const express = require('express')
const router = express.Router();

const {getAll,getHotelById, postBookedHotel , deleteBookedHotel,editBookedHotel,getByUserName , getBookedByDate, getAggr, getPrice} = require('../controllers/bookedHotels.controller')

router.get('/', getAll)

// get total price
router.get('/agg', getAggr)


//get data by date
router.get('/date_range', getBookedByDate )

//get data by user
router.get('/user', getByUserName )

router.get('/:id', getHotelById)

router.post('/', postBookedHotel)

router.put('/:id',editBookedHotel)

router.delete('/:id',deleteBookedHotel)





module.exports = { bookedHotelsRouter: router };