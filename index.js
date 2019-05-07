var express = require('express');
var socket = require('socket.io');

//Create express object.
var app = express();

//Create a webserver.
var server = app.listen(4000, () => {
    console.log('Listening for request on port 4000');
});

//Serve the static files located in the 'public' folder.
app.use(express.static('public'));

//Bind to the http server created using express.
var io = socket(server);
io.on('connection', (socket) => {
    console.log('Made socket connection ', socket.id);
    socket.on('disconnect', (reason)=>{
        console.log('Socket disconnected: '+ reason);
    });

    //Step 2) On receiving the 'chat' message, emit that message to other
    //connections.
    socket.on('chat', (data)=>{
        io.sockets.emit('chat', data)
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});