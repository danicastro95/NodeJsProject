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

    socket.on('disconnect', function () {

        // Elimina al usuario del array cuando se desconecta
        users.splice(users.indexOf(nick), 1);

        //Notificacion de abandono
        socket.broadcast.emit('left', nick);
    });


    // Crea nota
    socket.on('newNote', function (data) {
        data['creator'] = nick;
        notes.push(data);
        socket.broadcast.emit('new', data);
    });


    // Elimina nota
    socket.on('delNote', function (data) {
        let i = 0;
        notes.forEach(n => {
            if (data == n.noteId) {
                notes.splice(i, 1);
            }
            i++;
        });
        // Transmite el id de la nota eliminada
        socket.broadcast.emit('del', data);
    });


    // Cambia prioridad
    socket.on('changePri', function (data) {
        notes.forEach(n => {
            if (data[0] == n.noteId) {
                n.priority = data[1];
            }
        });
        // Transmite el id de la nota y la nueva prioridad
        socket.broadcast.emit('pri', [data[0], data[1]]);
    });

    // Completar nota
    socket.on('comNote', function (data) {
        notes.forEach(n => {
            if (data == n.noteId) {
                n.done = !n.done;
            }
        });
        socket.broadcast.emit('do', data);
    });


    // Login usuario
    socket.on('login', function (msg) {
        nick = msg;

        // Control de nicks duplicados
        if (users.includes(nick)) {
            socket.emit('log', false);
        } else {
            users.push(nick);
            socket.emit('log', true);
            // Transmite las notas almacenadas en el servidor
            socket.emit('notes', notes);
        }
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});