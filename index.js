const path = require('path');
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

/* settings */
app.set('port', process.env.PORT || 5000);

/* static files */
app.use(express.static(path.join(__dirname, 'public')));

app.get('/code', function (req, res) {
  const code = uuidv4();
  app.get('/' + code, function (req, res) {
    res.sendFile(path.join(__dirname, 'public/games.html'));
  });
  res.send(code);
});


/* start the server */
const server = app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});

/* websockets */
const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('new connection', socket.id);

  socket.on('player', (data) => {
    io.sockets.emit('server_msg', data);
  });

  socket.on('join room', (data) => {
    socket.join(data);
    console.log(socket.id, 'joined room', data);
  });

  socket.on('player comb', (comb, roomCode) => {
    socket.to(roomCode).emit('test', comb);
  });

  socket.on('player code', (code, roomCode) => {
    socket.to(roomCode).emit('test1', code);
  });

  socket.on('gameOver', (msg, roomCode) => {
    socket.to(roomCode).emit('youLoose', msg);
  });
});
