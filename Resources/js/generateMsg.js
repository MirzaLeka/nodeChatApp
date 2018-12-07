
import moment from 'moment'; // importing moment to the client side

module.exports.generateMsg = (message, text) => {

  const formattedTime = moment(message.createdAt).format('h:mm a');

  const li = document.createElement('li');
  li.classList = 'message';
    
  const div = document.createElement('div');
  div.classList = 'message__title';
  
  const h4 = document.createElement('h4');
  h4.textContent = message.from;
  
  const span = document.createElement('span');
  span.textContent = formattedTime;
  
  const body = document.createElement('div');
  body.classList = 'message__body';
    
  const p = document.createElement('p');
  
  if (text) {
  
    p.textContent = message.text;
    body.append(p);
  
  } else {
      
    const a = document.createElement('a');
  
    a.textContent = 'My current location';
    a.setAttribute('target', '_blank');
    a.setAttribute('href', message.url);
    body.append(p, a);
  }
    
  div.append(h4, span);
  li.append(div, body);
  
  return li;

};
