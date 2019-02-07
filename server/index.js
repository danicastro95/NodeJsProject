var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/* app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
}); */

var users = new Array();
var notes = new Array();

io.on('connection', function (socket) {
    var nick;
    //Enviar notas al cliente
    socket.on('disconnect', function () {
        users.splice(users.indexOf(nick), 1);
        socket.broadcast.emit('left', nick);
    });

    socket.on('newNote', function (data) {
        data['creator'] = nick;
        notes.push(data);
        socket.broadcast.emit('new', data);
    });

    socket.on('delNote', function (data) {
        let i = 0;
        notes.forEach(n => {
            if (data == n.noteId) {
                notes.splice(i, 1);
            }
            i++;
        });
        socket.broadcast.emit('del', data);
    });

    socket.on('changePri', function (data) {
        notes.forEach(n => {
            if (data[0] == n.noteId) {
                n.priority = data[1];
            }
        });
        socket.broadcast.emit('pri', [data[0], data[1]]);
    });

    socket.on('login', function (msg) {
        nick = msg;
        if (users.includes(nick)) {
            socket.emit('log', false);
        } else {
            users.push(nick);
            socket.emit('log', true);
            socket.emit('notes', notes);
        }
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});