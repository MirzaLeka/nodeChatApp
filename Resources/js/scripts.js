
import 'normalize.css/normalize.css';
import '../sass/styles.scss';
import io from 'socket.io-client'; // came along with socket.io and installed using npmjs
import moment from 'moment'; // importing moment to the client side

const socket = io();

socket.on('connect', () => { 
  console.log('connected to the server'); // event name, callback function

});

socket.on('disconnect', () => {
  console.log('Disconnected form server');
});


socket.on('newMessage', (message) => {

//   <li class="message">
//   <div class="message__title">
//     <h4>{{from}}</h4>
//     <span>{{createdAt}}</span>
//   </div>
//   <div class="message__body">
//     <p>
//       <a href="{{url}}" target="_blank">My current location</a>
//     </p>
//   </div>
// </li>


  const formattedTime = moment(message.createdAt).format('h:mm a');

  const li = document.createElement('li');
  li.classList = 'message';
  
  const div = document.createElement('div');
  div.classList = 'message__title';

  const h4 = document.createElement('h4');
  h4.textContent = message.from;

  const span = document.createElement('span');
  span.textContent = formattedTime;

  // appendings
  li.append(div);
  h4.append(span);
  div.append(h4, span);


  /*li.append(div);
  div.append(h4, span);
*/

  // const body = document.createElement('div');


  // li.textContent = `${message.from} ${formattedTime}: ${message.text}`;

  document.querySelector('[name="messagesList"]').append(li);
});


document.messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (document.querySelector('#messageInput').value === '') {
    return;
  }

  const messageTextbox = document.messageForm.message;

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.value
  }, () => {
    messageTextbox.value = '';
  });
});


socket.on('newLocationMessage', (message) => {

  const formattedTime = moment(message.createdAt).format('h:mm a');

  const li = document.createElement('li');
  const a = document.createElement('a');

  a.textContent = 'My current location';
  a.setAttribute('target', '_blank');
  a.setAttribute('href', message.url);

  li.textContent = `${message.from} ${formattedTime}: `;
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
