const holidaysModel = require('../models/Holidays.model')
const ObjectId = require('mongoose').Types.ObjectId

// get all holidays
exports.getAll = async (req, res) => {
    await holidaysModel.find({}).populate('City').populate("Tourist").populate("Guide").exec((err, holidays) => {
        (!err) ? res.send(holidays)
            : console.log('error in get all holidays: ' + JSON.stringify(err, undefined, 2))
    })
}


//get holidy by id
exports.getById = async(req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No holiday given id :  ${req.params.id}`);

   await holidaysModel.findById(req.params.id).populate("Tourist").populate("Guide").exec((err, holiday) => {
        (!err) ? res.send(holiday)
            : console.log('error in get holiday by id : ' + JSON.stringify(err, undefined, 2))

    })
}


// post new holiday
exports.postHoliday = async(req, res)=> {
    const holiday = new holidaysModel({
          City : req.body.city ,
          Evaluation  : req.body.evaluation,
          ImgURL:req.body.img,
          Period : req.body.period ,
          Price : req.body.price ,
          IsBooking : req.body.isBokking ,
          Tourist :req.body.tourest ,
          Guide :req.body.guide

    })
    await holiday.save((err, holiday)=> {
        (!err) ? res.send(holiday) 
        : console.log('error in post Holiday: ' + JSON.stringify(err, undefined, 2))

    }) 
}


// edit holiday
exports.editHoliday = (req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No Order given id :  ${req.params.id}`);
    var holiday = {
          City : req.body.city ,
          Evaluation  : req.body.evaluation,
          ImgURL:req.body.img,
          Period : req.body.period ,
          Price : req.body.price ,
          IsBooking : req.body.isBokking ,
          Tourist :req.body.tourest ,
          Guide :req.body.guide

    }


    holidaysModel.findOneAndUpdate(req.params.id, { $set: holiday }, { new: true },
        (err, holiday) => {
            (!err) ? res.send(holiday)
                : console.log('error in update holiday: ' + JSON.stringify(err, undefined, 2))
        })
}





// delete holiday by id
exports.deleteholiday = (req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No City with given id :  ${req.params.id}`);

    holidaysModel.findByIdAndRemove(req.params.id, (err, city) => {
        (!err) ? res.send(city)
            : console.log('error in delete holiday: ' + JSON.stringify(err, undefined, 2))
    })
}