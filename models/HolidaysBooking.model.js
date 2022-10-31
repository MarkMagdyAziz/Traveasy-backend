const mongoose = require('mongoose');

const holidaysBookingSchema = new mongoose.Schema({
   
    RoomCount  : Number,    
    AdultCount : Number ,
    Child : Number,
    IsApprove : Boolean ,
    Holidays :  {
      type: mongoose.Schema.Types.ObjectId,
       ref: 'Holidays',
     } ,
    Tourist :  {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      } ,
    Guide : {type : mongoose.Schema.Types.ObjectId ,
    ref : 'User'} 
  });
  
  module.exports = mongoose.model('HolidaysBooking', holidaysBookingSchema);
  
