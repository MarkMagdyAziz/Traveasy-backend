const express = require('express')
const router = express.Router();
const {authJwt} = require('../middlewares')

const {getAll,getLimit, postHotel, deletehotel, getById,editHotel , getHotelsByEvaluation, getHotelByName,getHotelsByPrice, getByCity} = require('../controllers/hotel.controller')

router.get('/', getAll)

router.get('/limit', getLimit)

router.get('/city', getByCity)

router.get('/rate', getHotelsByEvaluation)
router.get('/name', getHotelByName)
router.get('/price', getHotelsByPrice)


router.get('/:id', getById)

router.post('/',[authJwt.verifyToken] , postHotel)
// router.post('/',postHotel)

// router.put('/:id', editHotel)

router.put('/:id',[authJwt.verifyToken] , editHotel)

router.delete('/:id',[authJwt.verifyToken] , deletehotel)

module.exports = { hotelsRouter: router };
