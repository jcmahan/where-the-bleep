var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var userSchema = new Schema({
    name: String, 
    events_hosted: [{type: Schema.Types.ObjectId, ref: 'Event'}],
    events_attended: [{type: Schema.Types.ObjectId, ref: 'Event'}]
});
module.exports = mongoose.model('User', userSchema);