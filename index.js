const path = require('path');
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

// settings
app.set('port', process.env.PORT || 5000);

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.get("/code", function(req, res){
	let code = uuidv4();
	app.get("/" + code, function(req, res){
		res.sendFile(path.join(__dirname, 'public/games.html'));
	});
	res.send(code);
});

app.get("/test", function(req, res){
	res.sendFile(path.join(__dirname, 'public/test.html'));
});


// start the server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

// websockets
const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('player', (data) => {
        io.sockets.emit('server_msg', data);
    })
});
