const express = require('express')
const router = express.Router();

const {authJwt} = require('../middlewares')
const { getAll, postBookedHoliday, deleteBookedHoliday, getById, editBookedHoliday, getBookedByDate, getAggr, getByUserName } = require('../controllers/bookedHolidays.controller')



router.get('/', getAll)

// get total price
router.get('/agg', getAggr)

//get data by date
router.get('/date_range', getBookedByDate)

//get data by user
router.get('/user', [authJwt.verifyToken] ,getByUserName)
// router.get('/user' ,getByUserName)


router.get('/:id',[authJwt.verifyToken] , getById)

router.post('/',[authJwt.verifyToken] , postBookedHoliday)
// router.post('/', postBookedHoliday)

router.put('/:id',[authJwt.verifyToken, authJwt.isModerator] , editBookedHoliday)
// router.put('/:id', editBookedHoliday)

router.delete('/:id',[authJwt.verifyToken, authJwt.isAdmin] , deleteBookedHoliday)
// router.delete('/:id', deleteBookedHoliday)

module.exports = { bookedHolidaysRouter: router };