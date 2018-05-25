var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var eventSchema = new Schema({
    eventTitle: String, 
    eventDate: Date, 
    eventTime: String, 
    eventHosts: [{type: Schema.Types.ObjectId, ref: 'User'}],
    eventAttendees: [{type: Schema.Types.ObjectId, ref: 'User'}]
});
module.exports = mongoose.model('Event', eventSchema);