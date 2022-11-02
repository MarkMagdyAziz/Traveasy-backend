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
  
  const BookedHolidays =mongoose.model('bookedHolidays', holidaysBookingSchema); 
  module.exports = BookedHolidays;  
