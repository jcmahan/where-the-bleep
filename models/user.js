var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const SALT_ROUNDS = 6; 

var Schema = mongoose.Schema; 

var userSchema = new Schema({
    name: String, 
    email: {type: String, required: true, lowercase: true, unique: true}, 
    password: String, 
    events_hosted: [{type: Schema.Types.ObjectId, ref: 'Event'}],
    events_attended: [{type: Schema.Types.ObjectId, ref: 'Event'}]
});

userSchema.set('toJSON', {
    transform: function(doc, ret) {
        delete ret.password, ret.events_hosted, ret.events_attended;
        return ret;  
    }
})
userSchema.pre('save', function(next) {
    var user = this; 
    if (!user.isModified('password')) return next; 
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash){
        if (err) return next (err); 
        user.password = hash;
        next()
    });
});

module.exports = mongoose.model('User', userSchema);