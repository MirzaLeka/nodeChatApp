
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

// Connecting
io.on('connection', (socket) => {
  console.log('New user connected');


  // Disconnecting
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

});


server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
