const express = require('express')
const router = express.Router();

const {getAll, postFeedback, deleteFeedback} = require('../controllers/feedback.controller')

router.get('/', getAll)

router.post('/', postFeedback)

router.delete('/:id', deleteFeedback)

module.exports = { FeedbackRouter: router };