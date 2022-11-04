const ObjectId = require('mongoose').Types.ObjectId
const feedbackModel = require('../models/feedback.model')


exports.getAll = async (req, res) => {
    await feedbackModel.find({}).populate("Hotels").populate("Guide", "-password").exec((err, feedback) => {
        (!err) ? res.send(feedback)
            : console.log('error in get feedback by id : ' + JSON.stringify(err, undefined, 2))

    })
}


exports.postFeedback = async(req, res)=> {
    const feedback = new feedbackModel({
        Hotels: req.body.hotels,
        Guide: req.body.guide,
        Description: req.body.description,


    })
    await feedback.save((err, feedback)=> {
        (!err) ? res.send(feedback) 
        : console.log('error in post feedback: ' + JSON.stringify(err, undefined, 2))

    }) 
}

// delete feedback by id
exports.deleteFeedback = (req, res) => {
    (!ObjectId.isValid(req.params.id)) && res.status(400).send(`No feedback with given id :  ${req.params.id}`);

    feedbackModel.findByIdAndRemove(req.params.id, (err, feedback) => {
        (!err) ? res.send(feedback)
            : console.log('error in delete feedback: ' + JSON.stringify(err, undefined, 2))
    })
}