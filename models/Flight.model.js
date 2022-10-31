const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    FlyingFrom : String,
    FlyingTo : String,
    DepartureDate  : Date,
    ReturnDate :Date,
    TravellerCount : Number,
    Child : Number ,
    Infant : Number ,
    CabinClass :String ,    
    IsBooking : Boolean ,
    Tourist :  {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      } ,
    Airline : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Airline'
    }   
       
  });
  
  module.exports = mongoose.model('Flight', flightSchema);
  
