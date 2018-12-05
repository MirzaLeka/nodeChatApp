
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const controller = require('./Controller/routes');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, '../Resources/dist');


/* Middlewares */

app.use(express.static(distPath, {
  extensions: ['html', 'htm']
}));
app.use(controller);


/* Web Sockets */

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});


server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
