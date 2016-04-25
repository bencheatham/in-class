// it should have three views
  // classroom
  // teacher
  // student

// classroom
  // should know when a user enters a room

// web socket should 
  // identify type of user connecting to socket

  // broadcast to a subset of connected users

// teacher should see a dashboard of thumbs
  // number of thumbs should reflect numb of students online

// student should see a "thumb" button 
  // student should have be able to toggle "thumbs" button
    // if student clicks thumb
      // websocket should emit an action called "thumbs"

      // user's thumb display should be flipped

      // teacher should see the new state of the thumb

  // form
    // assign a username
    // assign a user type
    // on submit go to page with socket.io html

  var user_type = "student";
  var thumb = true; 

  // every message should send information
    // username:
    // type:
    // thumb:    

  // store relationship between events and callback functions
  var socketEvents = {
    'thumbs': updateThumb
  }

  // callback function for when event emitted
  function updateThumb () { socket.emit('new message', {time: Date.now()}); }

  // add event listenor 
  for (var key in socketEvents) {
    socket.on(key, socketEvents[key].bind(socket)); 
  }
  

  // EVENTS

  // user connects
  // user disconnects