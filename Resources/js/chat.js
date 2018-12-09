
import 'normalize.css/normalize.css';
import '../sass/chat.scss';

import io from 'socket.io-client'; // needs to be installed
import { generateMsg } from './Modules/generateMsg';
import { autoScroll } from './Modules/autoScrolling';
import { geoLocation } from './Modules/geoLocation';


const socket = io();

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
    } 
  });

});


socket.on('disconnect', () => {});


socket.on('updateUserList', (users) => {

  const li = users.map(user => `<li>${user}</li>`).join('');
  document.querySelector('#olList').innerHTML = li;

});


socket.on('newMessage', (message) => {

  const li = generateMsg(message, true);

  document.querySelector('#messages').append(li);
  autoScroll();

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
  autoScroll();

});


const locationBtn = document.querySelector('#locationBtn');

locationBtn.addEventListener('click', () => {
  geoLocation(socket, locationBtn);
});
