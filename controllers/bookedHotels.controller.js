const BookedHotelsModel = require('../models/bookedHotels.model')
const ObjectId = require('mongoose').Types.ObjectId

// get all booked hotels
exports.getAll = async (req, res) => {
    await BookedHotelsModel.find({}).populate('Hotels').populate("Tourist", "-password").populate("Guide", "-password").exec((err, hotels) => {
        (!err) ? res.send(hotels)
            : console.log('error in get all hotels: ' + JSON.stringify(err, undefined, 2))
    })
}


//get hotel by id
exports.getHotelById = async(req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No hotel given id :  ${req.params.id}`);

   await BookedHotelsModel.findById(req.params.id).populate('Hotels').populate("Tourist", "-password").populate("Guide", "-password").exec((err, hotel) => {
        (!err) ? res.send(hotel)
            : console.log('error in get hotel by id : ' + JSON.stringify(err, undefined, 2))

    })
}


// post new hotel
exports.postBookedHotel = async(req, res)=> {

    const hotel = new BookedHotelsModel({
        RoomCount  :req.body.roomCount,    
        AdultCount :req.body.adultCount ,
        Child :req.body.child,
        Period : req.body.period,
        Single : req.body.single,
        Double : req.body.double,
        IsApprove :req.body.isApprove ,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        Hotels :req.body.hotels,
        Tourist :req.body.tourest ,
        Guide :req.body.guide

    })
    await hotel.save((err, hotel)=> {
        (!err) ? res.send(hotel) 
        : console.log('error in post bookedHotel: ' + JSON.stringify(err, undefined, 2))

    }) 
}


// edit hotel
exports.editBookedHotel = (req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No hotel given id :  ${req.params.id}`);
   
    var hotel = {
        RoomCount  :req.body.roomCount,    
        AdultCount :req.body.adultCount ,
        Child :req.body.child,
        Period : req.body.period,
        Single : req.body.single,
        Double : req.body.double,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        IsApprove :req.body.isApprove ,
        Hotels :req.body.hotels,
        Tourist :req.body.tourest ,
        Guide :req.body.guide

    }


    BookedHotelsModel.findOneAndUpdate(req.params.id, { $set: hotel }, { new: true },
        (err, hotel) => {
            (!err) ? res.send(hotel)
                : console.log('error in update bookedhotel: ' + JSON.stringify(err, undefined, 2))
        })
}





// delete hotel by id
exports.deleteBookedHotel = (req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No hotel with given id :  ${req.params.id}`);

    BookedHotelsModel.findByIdAndRemove(req.params.id, (err, hotel) => {
        (!err) ? res.send(hotel)
            : console.log('error in delete hotel: ' + JSON.stringify(err, undefined, 2))
    })
}


//  filterations:

//get bookedHotels by date
exports.getBookedByDate = async (req, res) => {

    try {
        //get dates from req.query 
        let { startDate, endDate } = req.query;

        //1. check that date is not empty
        if (startDate === '' || endDate === '') {
            return res.status(400).json({
                status: 'failure',
                message: 'Please ensure you pick two dates'
            })
        }
        //3. Query database using Mongoose
        const BookedModels = await BookedHotelsModel.find({
        //find models that it's startDate is more than given startDate & it's endDate is less than given endDate  
            $and: [
                { startDate: 
                    { 
                        $gt: new Date(new Date(startDate).setHours(00, 00, 00))
                     }
             }, {
                 endDate: {
                     $lte:new Date(new Date(endDate).setHours(23, 59, 59)) 
                    }
                 }]
        }).populate('Hotels').populate("Tourist", "-password").populate("Guide", "-password").exec()

        //4. Handle responses
        if (!BookedModels) {
            return res.status(404).json({
                status: 'failure',
                message: 'Could not retrieve BookedModels'
            })
        }
        res.status(200).json( BookedModels)

    } catch (error) {
        return res.status(500).json({
            status: 'failure',
            error: error.message
        })
    }
}




// BookedHotelsModel.aggregate([
//     {
//         $group: { 
//             _id: null,
//             total: {$sum: {$multiply: ["$Price", "$Period", "$RoomCount"]}}
//         }
//     }
// ])