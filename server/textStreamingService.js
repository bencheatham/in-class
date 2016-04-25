var connections = {};

module.exports = function initializeChatStreaming (server) {
	var io = require('socket.io')(server);
	
  var students = [];
  var teachers = [];

	function newMessage (message) {
	  // console.log('new message: ', message);
	  // tell the client to execute 'new message'
	  this.broadcast.emit('new message', { username: this.username, message: message });
	}

	function addUser (data) {
	  // store the username in the socket session for this client
	  this.username = data.username;
		this.type = data.type;

	  if (this.type === 'student'){
	  	students.push(this);
	  	updateStudentList(this);
	  } else if (this.type === 'teacher') {
	  	teachers.push(this);
	  }

	  // echo globally (all clients) that a person has connected
	  // this.broadcast.emit('user joined', { username: this.username, numUsers: numUsers });
	  console.log(data.username,'connected to server.', students.length + teachers.length, 'users online.');
	}

	function typing () { this.broadcast.emit('typing', { username: this.username }); }

	function stopTyping () { this.broadcast.emit('stop typing', { username: this.username }); }

	function disconnect () {
    delete connections[this.id];
    console.log('Socket: ' + this.id + ' has disconnected');


		if (!this.username) { return void 0; }
	  
	  if (this.type === 'student'){
	  	students.count--;
	  } else if (this.type === 'teacher') {
	  	teachers.count--;
	  }
	  // echo globally that this client has left
	  this.broadcast.emit('user left', { username: this.username});
	  console.log('disconnect: ', this.username);
	}

	var clientEvents = {
	  'new message': newMessage,
	  'login': addUser,
	  'typing': typing,
	  'stop typing': stopTyping,
	  'disconnect': disconnect
	};

	io.on('connection', function (socket) {
		for (var key in clientEvents) { socket.on(key, clientEvents[key].bind(socket)); }
	});

	function updateStudentList(newUser){
		teachers.forEach(function(teacher){
	  		teacher.emit('student-login', newUser.username);	
	 	})	
	};

};