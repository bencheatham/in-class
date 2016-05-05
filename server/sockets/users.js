var _ = require('underscore');
var services = require('../users/services');

var socketEvents = {
  'users_emitOnlineUsers': emitOnlineUsers
};

function addUser(username) {
  this.username = username;
  ++numUsers;
  this.emit('login', { numUsers: numUsers });
  // echo globally (all clients) that a person has connected
  this.broadcast.emit('user joined', { username: this.username, numUsers: numUsers });
  console.log('add user: ', username, numUsers);
}

function emitOnlineUsers() {
  var users = services.getUsers();

  this.emit('users_updateUsers', {users: users} );
  this.broadcast.emit('users_updateUsers', {users: users} );
};

exports.module = {
  socketEvents: socketEvents
};
