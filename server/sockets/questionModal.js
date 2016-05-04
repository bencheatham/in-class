var _ = require('underscore');

var socketEvents = {
  'questionModal_addNewUser': addNewUser,
  'questionModal_dequeueUser': dequeueUser
};

var users = [];

// emit add new user socket
function addNewUser(user) {
  if (users.indexOf(user.username) === -1) users.push(user.username);

  this.emit('questionModal_updateNewUser', { users: users });
  this.broadcast.emit('questionModal_updateNewUser', { users: users });
};

function dequeueUser() {
  var user = users.shift();
  this.emit('questionModal_getNextUser', {user: user});
  this.broadcast.emit('questionModal_getNextUser', {user: user});
}

exports.module = {
  socketEvents: socketEvents
}
