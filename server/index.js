var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    var nick;
    socket.on('disconnect', function () {
        socket.broadcast.emit('left', nick);
    });

    socket.on('mensaje', function (msg) {
        io.emit('mensaje', msg);
    });

    socket.on('typing', function (msg) {
        socket.broadcast.emit('typing', msg);
    });

    socket.on('join', function(msg) {
        nick = msg;
        socket.broadcast.emit('join', msg);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});