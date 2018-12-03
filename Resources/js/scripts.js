
// import { sayHello } from './home';
import '../sass/styles.scss';
import 'normalize.css/normalize.css';
import io from 'socket.io-client'; // came along with socket.io and installed using npmjs

const socket = io();

socket.on('connect', () => { 
  console.log('connected to the server'); // event name, callback function

  socket.emit('createMessage', {
    from: 'Mirza',
    text: 'Yup, that works for me' 
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected form server');
});


socket.on('newMessage', (message) => {
  console.log('newMessage', message);
});
