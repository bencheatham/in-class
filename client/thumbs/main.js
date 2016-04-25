/* globals $, window, io, prompt */


$(function() {
  // Initialize variables
  var $window = $(window);

  var socket = io();

  var connected = false;
  var isTyping = false;
  var lastTypingTime;
  var username, type;
  var thumb = true;

  $('#login-submit').on("click", function(){
    console.log('log in click');
    login();
    if (type === 'student')
    $('#thumbs').css('display','block');
  })
  
  $('#thumbs').on("click", function(){
    if (thumb){
      $('#thumbs').css('background-color','red');
    } else {
      $('#thumbs').css('background-color','green');
    }
    thumb = !thumb;
    toggleThumb(username);
  })

  // Sets the client's username
  function setUsername (username,type) { 
    socket.emit('login', 
      {
        username: username,
        type: type      
      });
  }

  function toggleThumb (username) { 
    socket.emit('thumb', 
      {
        username: username,
        thumb: thumb   
      });
  }

  // Sends a chat message
  function sendMessage (message) { socket.emit('new message', cleanInput(message)); }

  // Prevents input from having injected markup
  function cleanInput (input) { return $('<div/>').text(input).text(); }


  function login () {
    connected = true;
    username = $('#username').val();
    type = $('#select').val();
    $('#login').css('display','none');
    var message = 'Welcome to the chat stream – ';
    console.log(message,username);
    setUsername(username,type);
    return false;
  }

  function newMessage (data) {
    console.log('new message: ', data);
    $inputMessage.val(cleanInput(data.message));
  }

  function addStudent (data){
    console.log(data,'joined your class!');
    $( ".container" ).append( document.createTextNode( data ) );

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

  var clientEvents = {
    'set username': setUsername,
    'send message': sendMessage,
    'clean input': cleanInput
  };

  var serverEvents = {
    'student-login': addStudent,
    'new message': newMessage,
    'user joined': userJoined,
    'user left': userLeft,
    'typing': typing,
    'stop typing': stopTyping
  };

  // Socket events
  for (var key in serverEvents) { socket.on(key, serverEvents[key].bind(socket)); }
});
