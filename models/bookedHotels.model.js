const mongoose = require('mongoose');

const bookedHotelsSchema = new mongoose.Schema({
   
    RoomCount  : Number,    
    AdultCount : Number ,
    Child : Number,
    Period : String,
    Single : Number,
    Double : Number,
    IsApprove : Boolean ,
    startDate: Date,
    endDate: Date,
    //should take from ref***********************************
    Price : Number ,
    ////////////////////////
    Hotels :  {
      type: mongoose.Schema.Types.ObjectId,
       ref: 'Hotels',
     } ,
    Tourist :  {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      } ,
    Guide : {type : mongoose.Schema.Types.ObjectId ,
    ref : 'User'
    } 
  }
  ,
  
  { timestamps: true });
  
  const BookedHotels =mongoose.model('bookedHotels', bookedHotelsSchema); 
  module.exports = BookedHotels;  
