var _ = require('underscore');
var services = require('../users/services.js');

var socketEvents = {
  'users_getUsers': getUsers,
  'users_addUser': addUser,
  'users_removeUser': removeUser
};

function addUser(username) {
  services.addUser(username);
};

function getUsers() {
  var users = services.getUsers();

  this.emit('users_updateUsers', {users: users} );
  this.broadcast.emit('users_updateUsers', {users: users} );
};

function removeUser(user) {
  services.removeUser(user);
  // TODO separation of concern: should push the broadcast to somewhere else
  getUsers.bind(this)();
}

exports.module = {
  socketEvents: socketEvents
};
