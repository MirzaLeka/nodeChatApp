
import 'normalize.css/normalize.css';
import '../sass/chat.scss';

// import deparam from 'deparam';
import io from 'socket.io-client'; // needs to be installed
import { generateMsg } from './generateMsg';


const socket = io();

function scrollToBottom() {

  // Selectors
  const messages = document.querySelector('#messages');
  const newMessage = messages.children.lastChild;

  // Heights
  const clientHeight = messages.setAttribute('clientHeight', true);
  const scrollTop = messages.setAttribute('scrollTop', true);
  const scrollHeight = messages.setAttribute('scrollHeight', true);
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.previousElementSibling.innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    console.log('Should scroll');
  }

}

socket.on('connect', () => { 
  
  // the following turns query string into an object and removes query string symbols
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');
  const room = params.get('room');

  params.name = name;
  params.room = room;

  socket.emit('join', params, (err) => {
    if (err) {
      alert(err); // This is for uuser
      window.location.href = '/'; // if error, redirect to home page
    } else {
      // console.log('No error');
    }
  });

});

socket.on('disconnect', () => {
  console.log('Disconnected form server');
});


socket.on('updateUserList', (users) => {

  const li = users.map(user => `<li>${user}</li>`).join('');
  document.querySelector('#olList').innerHTML = li;

});


socket.on('newMessage', (message) => {

  const li = generateMsg(message, true);

  document.querySelector('#messages').append(li);
  // scrollToBottom();

});


document.messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (document.querySelector('#messageInput').value === '') {
    return;
  }

  const messageTextbox = document.messageForm.message;

  socket.emit('createMessage', {
    text: messageTextbox.value
  }, () => {
    messageTextbox.value = '';
  });
});


socket.on('newLocationMessage', (message) => {

  const li = generateMsg(message, false);

  document.querySelector('#messages').append(li);
  // scrollToBottom();

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
