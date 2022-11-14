let db = require('../models');
let FlightBookingDB = db.flightBooking;
let TouristDB = db.user;
let FlightDB = db.flight;
const ObjectId = require('mongoose').Types.ObjectId;

// get all FlightBooking
const GetAllFlightBooking = async (req, res) => {
    try {
        // Create filteration 
        let query = {};
        if (req.query.IsBooking)
            query.IsBooking = req.query.IsBooking;

        // search in tourist Ref
        if (req.query.Tourist) {
            const TouristSea = await TouristDB.findOne(
                { "username": { $regex: new RegExp(req.query.Tourist, "i") } }
            )
            query.Tourist = TouristSea._id
        }
        // search in Flight Ref
        if (req.query.Flight) {
            const FlightSea = await TouristDB.findOne(
                { "FlyingFrom": { $regex: new RegExp(req.query.Flight, "i") } }
            )
            query.Flight = FlightSea._id
        }
        const FlightBookingList = await FlightBookingDB.find(query)
            .populate("Tourist").populate("Flight")
            .exec(); res.send(FlightBookingList)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

// get By id 
const GetFlightBookingByID = async (req, res) => {
    const _id = req.params.id;
    (!ObjectId.isValid(_id)) && res.status(400).send(`No given Id  : ${_id}`);
    try {
        const FlightBookingfind = await FlightBookingDB.findOne({ _id })
            .populate("Tourist").populate("Flight").exec()

        FlightBookingfind ? res.status(200).json(FlightBookingfind)
            : res.status(404).send({ message: 'Not found FlightBooking By id' })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// Create Function Add FlightBooking 
const CreateFlightBooking = async (req, res) => {

    let FlightBookingModel = new FlightBookingDB({
        Tourist: req.body.Tourist,
        IsBooking: req.body.IsBooking,
        Flight: req.body.Flight
    });
    // colling Function Healper For Cheek true is boogink 
    const _id = req.body.Flight ;  
     const rsult  =  await FlightDB.findByIdAndUpdate(_id
        , { IsBooking : true  }).exec()  

    FlightBookingModel.save((err, model) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: 'Add Model succeed' })
    })
};



// edite Function 
const updateFlightBooking = async (req, res) => {

    const _id = req.params.id;
    const FlyingObj = {
        Tourist: req.body.Tourist,
        IsBooking: req.body.IsBooking,
        Flight: req.body.Flight
    };

    try {
        const FlyingObjUpd = await FlightBookingDB.findByIdAndUpdate(_id
            , { $set: FlyingObj }, { new: true }).exec()                 
        res.status(200).send(FlyingObjUpd)
    } catch (error) {
        res.status(400).json(error.message);
    }
}



// Delete Function 
const DeleteFlightBooking = async (req, res) => {
    const _id = req.params.id
    try {
        await FlightBookingDB.findByIdAndRemove(_id).exec();
        res.status(204).send('Delete Successed')
    } catch (err) {
        res.status(500).json(err.message);
    }
}

module.exports = { CreateFlightBooking, GetAllFlightBooking, GetFlightBookingByID, DeleteFlightBooking, updateFlightBooking };

