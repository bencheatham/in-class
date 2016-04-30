var questionSocketEvents = require('../client/question/server.jsx').module.questionEvents;
var quizSocketEvents = require('../client/quiz/server.jsx').module.quizEvents;
var _ = require('underscore');

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
		if (!this.username) { return void 0; }
	  --numUsers;
	  // echo globally that this client has left
	  this.broadcast.emit('user left', { username: this.username, numUsers: numUsers });
	  console.log('disconnect: ', this.username, numUsers);
	  this.disconnect();
	  // console.log(this);
	}


	// function ping () {
	// 	console.log('ping socket: ', this.id);
 //    this.emit('ping', {message: 'Are you still there?'});
	// }

	// function pong (message) {
	// 	console.log('socket active', this.id);
	// }

 function tellUsersStudentIsOnVideo (userPac) {
   this.broadcast.emit('newClassVideoUser', userPac );

 }


	var socketEvents = {
	  'new message': newMessage,
	  'add user': addUser,
	  'typing': typing,
	  'stop typing': stopTyping,
	  // 'pong': pong,
	  'disconnect': disconnect,
	  'teacherSelectedVideoUser' : tellUsersStudentIsOnVideo
	};

	var allSocketEvents = _.extend(socketEvents,questionSocketEvents, quizSocketEvents);

	io.on('connection', function (socket) {
		for (var key in allSocketEvents) { socket.on(key, allSocketEvents[key].bind(socket)); }
		// var pingInterval = setInterval(ping.bind(socket), 60000);
	});

	return io;

};