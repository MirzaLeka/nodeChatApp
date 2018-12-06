
import '../sass/styles.scss';
import 'normalize.css/normalize.css';
import io from 'socket.io-client'; // came along with socket.io and installed using npmjs

const socket = io();

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

  const messageTextbox = document.messageForm.message;

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.value
  }, () => {
    messageTextbox.value = '';
  });
});


socket.on('newLocationMessage', (message) => {

  const li = document.createElement('li');
  const a = document.createElement('a');

  a.textContent = 'My current location';
  a.setAttribute('target', '_blank');
  a.setAttribute('href', message.url);

  li.textContent = `${message.from}: `;
  li.append(a);

  document.querySelector('[name="messagesList"]').append(li);

});


const locationBtn = document.querySelector('#locationBtn');
locationBtn.addEventListener('click', geoLocation);


function geoLocation() {

  // check if browser supports navigator object
  if (!navigator.geolocation) {
    alert('Geolocation not supported your browser');
  }

  // disabling button while location is being sent
  locationBtn.setAttribute('disabled', 'disabled');
  locationBtn.textContent = 'Sending location...';
  
  // fetching user's location
  navigator.geolocation.getCurrentPosition((position) => {
  
    // If we are able to grab location
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

    locationBtn.removeAttribute('disabled');
    locationBtn.textContent = 'Send location';
    
  }, () => {

    // Error case => When user clicks block on pop-up
    alert('Unable to fetch location'); 

    locationBtn.removeAttribute('disabled');
    locationBtn.textContent = 'Send location';

  });

}
