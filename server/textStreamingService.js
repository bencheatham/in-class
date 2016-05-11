var questionSocketEvents = require('../client/question/server.jsx').module.questionEvents;
var quizSocketEvents = require('../client/quiz/server.jsx').module.quizEvents;
var chatSocketEvents = require('../client/chat/server.jsx').module.chatEvents;
var questionModal = require('./sockets/questionModal.js').module;
var thumbSocketEvents = require('../client/thumbs/server.jsx').module.thumbEvents;
var userSocketEvents = require('./sockets/users.js').module.socketEvents;

var _ = require('underscore');

module.exports = function initializeChatStreaming (server) {

	var io = require('socket.io')(server);
  var numUsers = 0;

	// tell the client to execute 'new message'
	function newMessage (message) {
	  this.broadcast.emit('new message', { username: this.username, message: message });
	}

	// store the username in the socket session for this client
	function addUser (username) {
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
	}


 function tellUsersStudentIsOnVideo (classUserPac) {
   this.broadcast.emit('newClassVideoUser', classUserPac );

 }

	var socketEvents = {
	  'new message': newMessage,
	  'add user': addUser,
	  'typing': typing,
	  'stop typing': stopTyping,
	  'disconnect': disconnect,
	  'teacherSelectedVideoUser' : tellUsersStudentIsOnVideo
	};

	var socketList = [
		questionSocketEvents,
		quizSocketEvents,
		chatSocketEvents,
		questionModal.socketEvents,
		thumbSocketEvents,
		userSocketEvents
	];

	var allSocketEvents = _.reduce(socketList, function(memo, eventList){
		return _.extend(memo, eventList);
	}, socketEvents);

	io.on('connection', function (socket) {
		for (var key in allSocketEvents) { socket.on(key, allSocketEvents[key].bind(socket)); }
	});

	return io;
};
