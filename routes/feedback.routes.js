const express = require('express')
const router = express.Router();

const {getAll,getByHotelName, postFeedback, deleteFeedback, getByHotelID} = require('../controllers/feedback.controller')

router.get('/', getAll)

// get feedbacks by hotelName
router.get('/hotel',getByHotelName)


// get feedbacks by hotelId
router.get('/hotelid',getByHotelID)

router.post('/', postFeedback)

router.delete('/:id', deleteFeedback)

module.exports = { FeedbackRouter: router };