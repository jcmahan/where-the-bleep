var Event = require('../models/event');

function create(req, res){
    var event = new Event(req.body);
    event.save()
    .catch(err => res.status(400).json(err));
};

function join(req, res) {
    Event.findOne(req.params.id)
    .then(function(event){
        event.eventAttendees.push(req.user._id);
        event.save(); 
    })
}
module.exports = {
    create,
    join
}