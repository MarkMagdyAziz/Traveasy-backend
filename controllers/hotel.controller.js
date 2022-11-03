const hotelsModel = require('../models/Hotels.model')
const cityModel = require('../models/City.model')
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
        Description: req.body.description,
        lon: req.body.lon,
        lat: req.body.lat,
        // startDate: req.body.startDate,
        // endDate: req.body.endDate,
        Price : req.body.price ,

    })
     hotel.save((err, hotel)=> {
        (!err) ? res.send(hotel) 
        : console.log('error in post hotel: ' + JSON.stringify(err, undefined, 2))

    }) 
}


// edit hotel
exports.editHotel = (req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No Holiday given id :  ${req.params.id}`);
    
    const hotel = {
        HotelName : req.body.hotelName,
        City : req.body.city ,
        Evaluation  : req.body.evaluation,
        ImgURL:req.body.img,
        Period : req.body.period,
        Single : req.body.single,
        Double : req.body.double,
        Description: req.body.description,
        lon: req.body.lon,
        lat: req.body.lat,
        // startDate: req.body.startDate,
        // endDate: req.body.endDate,
        Price : req.body.price ,

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


// filterations:

// get bookedHotels by its rate
exports.getHotelsByEvaluation = async (req, res) => {

    try {
        //get rate from req.query 
        let { rate } = req.query;

        //1. check that rate is not empty
        if (rate === '' ) {
            return res.status(400).json({
                status: 'failure',
                message: 'Please ensure you pick two dates'
            })
        }
        //3. Query database using Mongoose
        const RateModels = await hotelsModel.find({
        //find models that it's rate is equale/more than given rate  

            $or: [
                { Evaluation: 
                    { 
                        $eq: rate  
                   }
             }, {
                Evaluation: {
                     $gt:rate 
                    }
                 }]

    
        }).populate('City').exec()

        //4. Handle responses
        if (!RateModels) {
            return res.status(404).json({
                status: 'failure',
                message: 'Could not retrieve RateModels'
            })
        }
        res.status(200).json( RateModels)

    } catch (error) {
        return res.status(500).json({
            status: 'failure',
            error: error.message
        })
    }
}


// get hotel by it's name
exports.getHotelByName = async (req, res) => {

    let { hotelName } = req.query;

    await hotelsModel.find({
        HotelName:  { $regex: '.*' + hotelName + '.*' }
   
 }).populate('City').exec((err, hotels) => {
        (!err) ? res.send(hotels)
            : console.log('error in get hotelByName: ' + JSON.stringify(err, undefined, 2))
    })
}


// get hotel by city 
exports.getHotelByCity = async (req, res) => {

    // let { city } = req.query;
    // console.log(city)

    // await hotelsModel.find({}).populate('City').find(
    //     cityModel.find({City_Name : { 
    //         $eq: city  
    //    }})
    // ).exec((err, hotels) => {
    //     if(!err) {
    //         console.log('lol1111111')
    //     //     let data =  cityModel.find({City_Name : { 
    //     //         $eq: city  
    //     //    }})
    //         res.send( hotels )
    //     }
    //         else {
    //             console.log('error in get hotelByName: ' + JSON.stringify(err, undefined, 2))
    //         }
    // })
} 