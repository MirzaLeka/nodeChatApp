
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

// File imports
const controller = require('./Controller/routes');
const { generateMessage, generateLocationMessage } = require('./Utils/message');
const { isRealString } = require('./Utils/validation');

// Quick setup
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Port and path
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, '../Resources/dist');


// Middlewares 
app.use(express.static(distPath, {
  extensions: ['html', 'htm']
}));
app.use(controller);


// Web Sockets 
io.on('connection', (socket) => {
  console.log('New user connected');


  socket.on('join', (params, callback) => {
    console.log(params.name);
    console.log(params.room);
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required');
    }

    // joining room
    socket.join(params.room); // expects string

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // the following will be sent tho only those users who joined the room
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`)); 

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    // console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});


server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
