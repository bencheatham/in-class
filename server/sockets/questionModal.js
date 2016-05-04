var _ = require('underscore');

var socketEvents = {
  'questionModal_addNewUser': addNewUser
};

var users = [];

// emit add new user socket
function addNewUser(user) {
  if (users.indexOf(user.username) === -1) users.push(user.username);

  this.emit('questionModal_updateNewUser', { users: users });
  this.broadcast.emit('questionModal_updateNewUser', { users: users });
};

exports.module = {
  socketEvents: socketEvents
}
