var Event = require('../models/event');

function index(req, res) {
    Event.find({}).sort({eventTitle: 1}).exec()
    .then(function(events){
        res.status(200).json(events)
    })
    .catch(err => {
        res.status(401).json(err)
    })
};

function create(req, res){
    var event = new Event(req.body);
    event.save()
    .then(doc => res.status(200).json('Success!'))
    .catch(err => res.status(400).json(err));
};

function join(req, res) {
    Event.findOne({_id: req.params.id})
    .then(function(event){
        event.eventAttendees.push(req.body);
        event.save().then(() => {
            Event.find({}).sort({eventTitle: 1}).exec().then(events => {
                res.status(200).json(events);
            });
        });
    })
    .catch(err => res.status(401).json(err));
}
module.exports = {
    create,
    join, 
    index
}