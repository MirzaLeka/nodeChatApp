
module.exports.geoLocation = (socket, locationBtn) => {

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
  
};
