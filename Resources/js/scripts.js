
import '../sass/styles.scss';
import 'normalize.css/normalize.css';
import io from 'socket.io-client'; // came along with socket.io and installed using npmjs
import { say } from './a';

const socket = io();

say();

socket.on('connect', () => { 
  console.log('connected to the server'); // event name, callback function

});

socket.on('disconnect', () => {
  console.log('Disconnected form server');
});


socket.on('newMessage', (message) => {
  console.log('newMessage', message);
  const li = document.createElement('li');
  li.textContent = `${message.from} : ${message.text}`;

  document.querySelector('[name="messagesList"]').append(li);
});


document.messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: document.messageForm.message.value
  }, () => {

  });
});


const locationBtn = document.querySelector('#locationBtn');

locationBtn.addEventListener('click', () => {

  // check if browser supports navigator object
  if (!navigator.geolocation) {
    alert('Geolocation not supported your browser');
  }

  // fetching user's position
  navigator.geolocation.getCurrentPosition((position) => {

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  
  }, () => {
    alert('Unable to fetch location'); // Error case => When user clicks Deny on pop-up
  });

});
