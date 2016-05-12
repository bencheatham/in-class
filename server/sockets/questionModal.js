var _ = require('underscore');

var socketEvents = {
  'questionModal_addNewUser': addNewUser,
  'questionModal_dequeueUser': dequeueUser,
  'questionModal_removeUser': removeUser
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
};

function removeUser(user) {
  if (!user || !user.username) return;

  var idx = users.indexOf(user.username);
  if (idx !== -1) users.splice(idx, 1);

  console.log('users', users);

  this.emit('questionModal_setUsers', {users: users});
  this.broadcast.emit('questionModal_setUsers', {users: users});
};

exports.module = {
  socketEvents: socketEvents
}
