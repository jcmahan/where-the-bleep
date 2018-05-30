import socketClient from 'socket.io-client';

const socket = socketClient(); 

socket.on('test', function(data) {
    ;
});

export default socket; 