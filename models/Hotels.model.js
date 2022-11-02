const mongoose = require('mongoose');

const hotelsSchema = new mongoose.Schema({
    HotelName : String,
    City :  {
      type: mongoose.Schema.Types.ObjectId,
       ref: 'City',
     } ,
    Evaluation  : Number,
    ImgURL:[String],
    Period : String,
    Single : Number,
    Double : Number,
  });
    
  const hotelsModel =mongoose.model('Hotels', hotelsSchema); 
  module.exports = hotelsModel;