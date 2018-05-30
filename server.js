var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

require('dotenv').config();
require('./config/database');

var app = express();
var server = require('http').Server(app); 
var io = require('socket.io')(server);

app.use(logger('dev'));

// app.use(favicon(path.join(__dirname, 'build', 'favicon-ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(require('./config/auth'))

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/events', require('./routes/api/events'))

app.get('/', function(req, res){
    res.sendfile(__dirname + 'index.html')
});

// The following "catch all" route is necessary for
// a SPA's client-side routing to properly work
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

io.on('connection', function(socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function(data) {
        console.log(data);
    });
});

var port = process.env.PORT || 3001; 

app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
});
