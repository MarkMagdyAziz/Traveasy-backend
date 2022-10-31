const mongoose = require('mongoose');

const hotelsSchema = new mongoose.Schema({
    HotelName : String,
    City : String,
    Evaluation  : Number,
    ImgURL:[String],
    Period : String,
    Single : Number,
    Double : Number,
  });
  
  module.exports = mongoose.model('Hotels', hotelsSchema);
  
