const mongoose = require('mongoose');

const FeedbachSchema = new mongoose.Schema({
    Hotels :  {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Hotels',
       },
      Guide : {type : mongoose.Schema.Types.ObjectId ,
      ref : 'User'
      } ,
      Description: String,


});
const feedbackModel =mongoose.model('feedback', FeedbachSchema); 
module.exports = feedbackModel;