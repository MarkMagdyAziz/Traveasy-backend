const cityModel = require('../models/City.model')
const CityModel = require('../models/City.model')


exports.getAll = async (req, res) => {
    await CityModel.find({}).exec((err, city) => {
        (!err) ? res.send(city)
            : console.log('error in get city by id : ' + JSON.stringify(err, undefined, 2))

    })
}


exports.postCity = async(req, res)=> {
    const city = new cityModel({
        City_Name:  req.body.City_Name,
        location: { 
            //for Map Purpose
            longitude: req.body.lon,
            latitude: req.body.lat
        }

    })
    await city.save((err, city)=> {
        (!err) ? res.send(city) 
        : console.log('error in post City: ' + JSON.stringify(err, undefined, 2))

    }) 
}