
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

// File imports
const controller = require('./Controller/routes');
const { generateMessage, generateLocationMessage } = require('./Utils/message');
const { isRealString } = require('./Utils/validation');
const { Users } = require('./Utils/users');

// Quick setup
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

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
      return callback('Name and room name are required');
    }

    // joining room
    socket.join(params.room); // expects string

    // removing user
    users.removeUser(socket.id);

    // adding user
    users.addUser(socket.id, params.name, params.room);

    io.emit(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // the following will be sent tho only those users who joined the room
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`)); 

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }


    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    const user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
    
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);

    if (user) {

      // updating users list
      io.to(user.room).emit('updateUserList', users.getUserList(user.room)); 

      // give us a message that user left the room
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`)); 
    }
  });
});


server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
