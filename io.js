var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRET;

var io; 

function init(http) {
    io = require('socket.io')(http);
    
    io.on('connection', function(socket) { 

        socket.on('register', function(token) {
            jwt.verify(token, SECRET, function(err, decoded) {
                if (!err) socket.user = decoded.user; 

            });
        });
        socket.on('update-location', function(move) {
            if (!socket.user) return;
            // drop user pin on map 
        })
    });
}

function get() {
    return io; 
};

module.exports = {
    init, 
    get
}; 