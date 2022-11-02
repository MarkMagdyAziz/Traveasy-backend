let db = require('../models');
let FlightDB = db.flight;
const ObjectId = require('mongoose').Types.ObjectId;

// get all Flight
const GetAllFlight = async (req, res) => {
  try {
    const FlightList = await FlightDB.find({}).populate('Tourist').populate('Airline').exec();
    res.send(FlightList);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

// get By id
const GetFlightByID = async (req, res) => {
  const _id = req.params.id;
  !ObjectId.isValid(_id) && res.status(400).send(`No given Id  : ${_id}`);
  try {
    const Flightfind = await FlightDB.findOne({ _id })
      .populate('Tourist')
      .populate('Airline')
      .exec();

    Flightfind
      ? res.status(200).json(Flightfind)
      : res.status(404).send({ message: 'Not found Flight By id' });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// create function Search by Flight Name

const SerachFlight = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.json({
      error: 'Missing required q parameter',
    });
  }
  try {
    const FlightSea = await FlightDB.find({
      FlyingFrom: { $regex: new RegExp(query, 'i') },
    }).exec();
    res.status(200).json(FlightSea);
  } catch (error) {
    res.status(400).json(err.message);
  }
};

// Create Function Add Flight

const CreateFlight = (req, res) => {
  let FlightModel = new FlightDB({
    FlyingFrom: req.body.FlyingFrom,
    FlyingTo: req.body.FlyingTo,
    DepartureDate: req.body.DepartureDate,
    ReturnDate: req.body.ReturnDate,
    TravellerCount: req.body.TravellerCount,
    Child: req.body.Child,
    Infant: req.body.Infant,
    CabinClass: req.body.CabinClass,
    IsBooking: req.body.IsBooking,
    Tourist: req.body.Tourist,
    Airline: req.body.Airline,
  });

  FlightModel.save((err, model) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: 'Add Model succeed' });
  });
};

// edite Function

const updateFlight = async (req, res) => {
  const _id = req.params.id;
  const FlyingObj = {
    FlyingFrom: req.body.FlyingFrom,
    FlyingTo: req.body.FlyingTo,
    DepartureDate: req.body.DepartureDate,
    ReturnDate: req.body.ReturnDate,
    TravellerCount: req.body.TravellerCount,
    Child: req.body.Child,
    Infant: req.body.Infant,
    CabinClass: req.body.CabinClass,
    IsBooking: req.body.IsBooking,
    Tourist: req.body.Tourist,
    Airline: req.body.Airline,
  };

  try {
    const FlyingObjUpd = await FlightDB.findByIdAndUpdate(
      _id,
      { $set: FlyingObj },
      { new: true }
    ).exec();

    res.status(200).send(FlyingObjUpd);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Delete Function
const DeleteFlight = async (req, res) => {
  const _id = req.params.id;
  try {
    await FlightDB.findByIdAndRemove(_id).exec();
    res.status(204).send('Delete Successed');
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  CreateFlight,
  GetAllFlight,
  GetFlightByID,
  DeleteFlight,
  updateFlight,
  SerachFlight,
};
