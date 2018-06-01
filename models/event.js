var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var locationSchema = new Schema({
    name: String,
    userId: String,
    lat: Number,
    lng: Number
});

var eventSchema = new Schema({
    eventTitle: String, 
    eventStreetAddress: String,
    eventCity: String, 
    eventState: String,  
    eventDate: Date, 
    eventTime: String, 
    eventHost: {type: Schema.Types.ObjectId, ref: 'User'},
    eventAttendees: [{type: Schema.Types.ObjectId, ref: 'User'}],
    userLocations: [locationSchema]
});

module.exports = mongoose.model('Event', eventSchema);