var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRET;
var Event = require('./models/event');

var io;

var events = {};

function getOrFetchEvent(eventId) {
    return new Promise((resolve) => {
        if (events[eventId]) return resolve(events[eventId]);
        Event.findById(eventId).then(e => {
            events[eventId] = e;
            resolve(e);
        });
    });
}

function init(http) {
    io = require('socket.io')(http);
    
    io.on('connection', function(socket) { 
        
        socket.on('disconnect', function(socket) {
            console.log(`disconnected from eventID: ${socket.eventId}`)
        });

        socket.on('register', function(token) {
            jwt.verify(token, SECRET, function(err, decoded) {
                if (!err) socket.user = decoded.user; 
            });
        });

        socket.on('update-location', function(location) {
            if (!socket.user) return;
            getOrFetchEvent(socket.eventId).then(event => {
                var loc = event.userLocations.find(l => l.userId === socket.user._id);
                if (loc) {
                    loc.lat = location.lat;
                    loc.lng = location.lng;
                } else {
                    event.userLocations.push({...location, name: socket.user.name, userId: socket.user._id});
                    event.save();
                }
                io.to(socket.eventId).emit('update-locations', event.userLocations);
            });
        });

        socket.on('join-event', function(eventId) {
            if (!socket.user) return;
            socket.eventId = eventId;
            socket.join(eventId);
        });

        socket.on('leave-event', function(eventId) {
            getOrFetchEvent(eventId).then(event => {
                if (!event) return;
                event.userLocations.splice(
                    event.userLocations.findIndex(loc => loc.userId === socket.user._id),
                    1
                );
                event.save();
                io.to(eventId).emit('update-locations', event.userLocations);
                socket.leave(eventId, function() {
                    io.in(eventId).clients(function(err, clients) {
                        if (!clients.length) {
                            event.userLocations = [];
                            event.save();
                        }
                    });
                });
            });
        });
        
    });
}

function get() {
    return io; 
};

module.exports = {
    init, 
    get
}; 