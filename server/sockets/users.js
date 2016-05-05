var _ = require('underscore');
var services = require('../users/services.js');

var socketEvents = {
  'users_getUsers': getUsers,
  'users_addUser': addUser
};

function addUser(username) {
  services.addUser(username);
};

function getUsers() {
  var users = services.getUsers();

  this.emit('users_updateUsers', {users: users} );
  this.broadcast.emit('users_updateUsers', {users: users} );
};

exports.module = {
  socketEvents: socketEvents
};
