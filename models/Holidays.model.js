const mongoose = require('mongoose');

const holidaysSchema = new mongoose.Schema({
    Country : String,
    City : String,
    Evaluation  : Number,
    ImgURL:String,
    Period : String ,
    Price : Number ,
    IsBooking : Boolean ,
    Tourist :  {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      } ,

    Guide : {type : mongoose.Schema.Types.ObjectId ,
    ref : 'User'} 
  });
  
  module.exports = mongoose.model('Holidays', holidaysSchema);
  
