const mongoose = require('mongoose');

const holidaysBookingSchema = new mongoose.Schema({
   
    RoomCount  : Number,    
    AdultCount : Number ,
    Child : Number,
    Period : String,
    IsApprove : Boolean ,
    startDate: Date,
    endDate: Date,
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
  }
  ,
  
  { timestamps: true }
  );
  
  const BookedHolidays =mongoose.model('bookedHolidays', holidaysBookingSchema); 
  module.exports = BookedHolidays;  
