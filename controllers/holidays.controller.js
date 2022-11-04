const holidaysModel = require('../models/Holidays.model')
const ObjectId = require('mongoose').Types.ObjectId
const CityModel = require('../models/City.model')

// get all holidays
exports.getAll = async (req, res) => {
    await holidaysModel.find({}).populate('City').populate("Tourist", "-password").populate("Guide", "-password").exec((err, holidays) => {
        (!err) ? res.send(holidays)
            : console.log('error in get all holidays: ' + JSON.stringify(err, undefined, 2))
    })
}


//get holidy by id
exports.getById = async(req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No holiday given id :  ${req.params.id}`);

   await holidaysModel.findById(req.params.id).populate('City').populate("Tourist", "-password").populate("Guide", "-password").exec((err, holiday) => {
        (!err) ? res.send(holiday)
            : console.log('error in get holiday by id : ' + JSON.stringify(err, undefined, 2))

    })
}


// post new holiday
exports.postHoliday = async(req, res)=> {
    const holiday = new holidaysModel({
          City : req.body.city ,
          Description: req.body.description,
          Evaluation  : req.body.evaluation,
          ImgURL:req.body.img,
          Period : req.body.period ,
          Price : req.body.price ,
          IsBooking : req.body.isBokking ,
          Tourist :req.body.tourest ,
          Guide :req.body.guide,
        //   startDate: req.body.startDate,
        //   endDate: req.body.endDate,

    })
    await holiday.save((err, holiday)=> {
        (!err) ? res.send(holiday) 
        : console.log('error in post Holiday: ' + JSON.stringify(err, undefined, 2))

    }) 
}


// edit holiday
exports.editHoliday = (req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No Holiday given id :  ${req.params.id}`);
    var holiday = {
          City : req.body.city ,
          Description: req.body.description,
          Evaluation  : req.body.evaluation,
          ImgURL:req.body.img,
          Period : req.body.period ,
          Price : req.body.price ,
          IsBooking : req.body.isBokking ,
          Tourist :req.body.tourest ,
          Guide :req.body.guide,
        //   startDate: req.body.startDate,
        //   endDate: req.body.endDate,

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



// filterations:

// get bookedHotels by its rate
exports.getHolidaysByEvaluation = async (req, res) => {
console.log('loool')
    try {
        //get rate from req.query 
        let { rate } = req.query;

        //1. check that rate is not empty
        if (rate === '' ) {
            return res.status(400).json({
                status: 'failure',
                message: 'Please ensure you pick two dates'
            })
        }
        //3. Query database using Mongoose
        const RateModels = await holidaysModel.find({
        //find models that it's rate is equale/more than given rate  

            $or: [
                { Evaluation: 
                    { 
                        $eq: rate  
                   }
             }, {
                Evaluation: {
                     $gt:rate 
                    }
                 }]


        }).populate('City').exec()

        //4. Handle responses
        if (!RateModels) {
            return res.status(404).json({
                status: 'failure',
                message: 'Could not retrieve RateModels'
            })
        }
        res.status(200).json( RateModels)

    } catch (error) {
        return res.status(500).json({
            status: 'failure',
            error: error.message
        })
    }
}

// search by city 
exports.getByCity = async (req, res) => {
    let query = {};

    // Check for Search City Ref
    if (req.query.city) {
        const CitySearch = await CityModel.findOne(
            { "City_Name": { $regex: new RegExp(req.query.city, "i") } }
        )
        query.City = CitySearch._id
    }

   try{
   let holidays = await  holidaysModel.find(query).exec()
        res.send(holidays)
    
    } catch (error) {
        res.status(404).json(error.message)
    }
}