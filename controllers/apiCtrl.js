var User = require('../models/user')
var Event = require('../models/event')

function getAllEvents(req, res) {
    Event.find({}, function(err, events){
        res.status(200).json(events);
    });
}

function getAllUsers(req, res) {
    User.find({}, function(err, users){
        res.status(200).json(users);
    });
}

function getEvent(req, res) {
    Event.findById(req.params.id, function(err, event){
        res.status(200).json(event);
    });
}

module.exports = {
    getAllUsers,
    getAllEvents,
    getEvent
};