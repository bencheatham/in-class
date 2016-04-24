var connections = {};

module.exports = function initializeChatStreaming (server) {
	var io = require('socket.io')(server);
  var numUsers = 0;

	function newMessage (message) {
	  // console.log('new message: ', message);
	  // tell the client to execute 'new message'
	  this.broadcast.emit('new message', { username: this.username, message: message });
	}

	function addUser (username) {
	  // store the username in the socket session for this client
	  this.username = username;
	  ++numUsers;
	  this.emit('login', { numUsers: numUsers });
	  // echo globally (all clients) that a person has connected
	  this.broadcast.emit('user joined', { username: this.username, numUsers: numUsers });
	  console.log('add user: ', username, numUsers);
	}

	function typing () { this.broadcast.emit('typing', { username: this.username }); }

	function stopTyping () { this.broadcast.emit('stop typing', { username: this.username }); }

	function disconnect () {
    delete connections[this.id];
    console.log('Socket: ' + this.id + ' has disconnected');


		if (!this.username) { return void 0; }
	  --numUsers;
	  // echo globally that this client has left
	  this.broadcast.emit('user left', { username: this.username, numUsers: numUsers });
	  console.log('disconnect: ', this.username, numUsers);
	}

	var socketEvents = {
	  'new message': newMessage,
	  'add user': addUser,
	  'typing': typing,
	  'stop typing': stopTyping,
	  'disconnect': disconnect
	};

	io.on('connection', function (socket) {
    console.log('Socket: ' + socket.id + ' has connected');
    connections[socket.id] = socket;

		for (var key in socketEvents) { socket.on(key, socketEvents[key].bind(socket)); }
	});

};