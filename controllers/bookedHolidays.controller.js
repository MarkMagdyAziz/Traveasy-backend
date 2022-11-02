const BookedHolidaysModel = require('../models/HolidaysBooking.model')
const ObjectId = require('mongoose').Types.ObjectId

// get all booked holidays
exports.getAll = async (req, res) => {
    await BookedHolidaysModel.find({}).populate('Holidays').populate("Tourist").populate("Guide").exec((err, holidays) => {
        (!err) ? res.send(holidays)
            : console.log('error in get all holidays: ' + JSON.stringify(err, undefined, 2))
    })
}


//get holidy by id
exports.getById = async(req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No holiday given id :  ${req.params.id}`);

   await BookedHolidaysModel.findById(req.params.id).populate('Holidays').populate("Tourist").populate("Guide").exec((err, holiday) => {
        (!err) ? res.send(holiday)
            : console.log('error in get holiday by id : ' + JSON.stringify(err, undefined, 2))

    })
}


// post new holiday
exports.postBookedHoliday = async(req, res)=> {

    const holiday = new BookedHolidaysModel({
        RoomCount  :req.body.roomCount,    
        AdultCount :req.body.adultCount ,
        Child :req.body.child,
        IsApprove :req.body.isApprove ,
        Holidays :req.body.holidays,
        Tourist :req.body.tourest ,
        Guide :req.body.guide

    })
    await holiday.save((err, holiday)=> {
        (!err) ? res.send(holiday) 
        : console.log('error in post Holiday: ' + JSON.stringify(err, undefined, 2))

    }) 
}


// edit holiday
exports.editBookedHoliday = (req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No Order given id :  ${req.params.id}`);
   
    var holiday = {
        RoomCount  :req.body.roomCount,    
        AdultCount :req.body.adultCount ,
        Child :req.body.child,
        IsApprove :req.body.isApprove ,
        Holidays :req.body.holidays,
        Tourist :req.body.tourest ,
        Guide :req.body.guide

    }


    BookedHolidaysModel.findOneAndUpdate(req.params.id, { $set: holiday }, { new: true },
        (err, holiday) => {
            (!err) ? res.send(holiday)
                : console.log('error in update bookedholiday: ' + JSON.stringify(err, undefined, 2))
        })
}





// delete holiday by id
exports.deleteBookedHoliday = (req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No City with given id :  ${req.params.id}`);

    BookedHolidaysModel.findByIdAndRemove(req.params.id, (err, city) => {
        (!err) ? res.send(city)
            : console.log('error in delete holiday: ' + JSON.stringify(err, undefined, 2))
    })
}