const express = require('express')
const router = express.Router();

const {getAll, postCity} = require('../controllers/city.controller')

router.get('/', getAll)

router.post('/', postCity)

module.exports = { cityRouter: router };