const hotelsModel = require('../models/Hotels.model')
const ObjectId = require('mongoose').Types.ObjectId

// get all hotels
exports.getAll = async (req, res) => {
    await hotelsModel.find({}).populate('City').exec((err, hotels) => {
        (!err) ? res.send(hotels)
            : console.log('error in get all hotels: ' + JSON.stringify(err, undefined, 2))
    })
}


//get hotel by id
exports.getById = async(req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No hotel given id :  ${req.params.id}`);

   await hotelsModel.findById(req.params.id).exec((err, hotel) => {
        (!err) ? res.send(hotel)
            : console.log('error in get hotel by id : ' + JSON.stringify(err, undefined, 2))

    })
}


// post new hotel
exports.postHotel = (req, res)=> {
    const hotel = new hotelsModel({
        HotelName : req.body.hotelName,
        City : req.body.city ,
        Evaluation  : req.body.evaluation,
        ImgURL:req.body.img,
        Period : req.body.period,
        Single : req.body.single,
        Double : req.body.double,

    })
     hotel.save((err, hotel)=> {
        (!err) ? res.send(hotel) 
        : console.log('error in post hotel: ' + JSON.stringify(err, undefined, 2))

    }) 
}


// edit hotel
exports.editHotel = (req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No Order given id :  ${req.params.id}`);
    
    const hotel = {
        HotelName : req.body.hotelName,
        City : req.body.city ,
        Evaluation  : req.body.evaluation,
        ImgURL:req.body.img,
        Period : req.body.period,
        Single : req.body.single,
        Double : req.body.double,

    }


    hotelsModel.findOneAndUpdate(req.params.id, { $set: hotel }, { new: true },
        (err, hotel) => {
            (!err) ? res.send(hotel)
                : console.log('error in update hotel: ' + JSON.stringify(err, undefined, 2))
        })
}





// delete hotel by id
exports.deletehotel = (req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No City with given id :  ${req.params.id}`);

    hotelsModel.findByIdAndRemove(req.params.id, (err, city) => {
        (!err) ? res.send(city)
            : console.log('error in delete hotel: ' + JSON.stringify(err, undefined, 2))
    })
}