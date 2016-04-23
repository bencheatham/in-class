/* globals $, window, io, prompt */


$(function() {


  // Initialize variables
  var $window = $(window);

  var $inputMessage = $('.inputMessage');
  $inputMessage.on('keyup', function () { var message = $(this).val(); sendMessage(message); });


  var socket = io();

  // Prompt for setting a username
  var username = prompt('what is your name?');
  setUsername(username);



  var connected = false;
  var isTyping = false;
  var lastTypingTime;



  // Sets the client's username
  function setUsername (username) { socket.emit('add user', username); }

  // Sends a chat message
  function sendMessage (message) { socket.emit('new message', cleanInput(message)); }


  // Prevents input from having injected markup
  function cleanInput (input) { return $('<div/>').text(input).text(); }


  function login (data) {
    connected = true;
    var message = 'Welcome to the chat stream – ';
    console.log(message, data);
  }

  function newMessage (data) {
    console.log('new message: ', data);
    $inputMessage.val(cleanInput(data.message));
  }

  function userJoined (data) {
    console.log(data.username + ' joined', data);
  }

  function userLeft (data) {
    console.log(data.username + ' left', data);
  }

  function typing (data) {
    console.log('typing', data);
  }

  function stopTyping (data) {
    console.log('stop typing', data);
  }



  var clientActions = {
    'set username': setUsername,
    'send message': sendMessage,
    'clean input': cleanInput
  };

  var socketEvents = {
    'login': login,
    'new message': newMessage,
    'user joined': userJoined,
    'user left': userLeft,
    'typing': typing,
    'stop typing': stopTyping
  };


  // Socket events

  for (var key in socketEvents) { socket.on(key, socketEvents[key].bind(socket)); }
});
