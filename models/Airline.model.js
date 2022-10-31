const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
    Airline : String,
    Country : String,
    Evaluation  : Number,
    ImgURL:String,
    Price : String 
  });
  
  module.exports = mongoose.model('Airline', hotelsSchema);
  
