const express = require('express')
const router = express.Router();

const {getAll, postCity, deleteCity} = require('../controllers/city.controller')

router.get('/', getAll)

router.post('/', postCity)

router.delete('/:id', deleteCity)

module.exports = { cityRouter: router };