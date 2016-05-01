/*globals $*/
import io from 'socket.io-client';
import { userJoinedClass } from '../actions/users';
import { userLeftClass } from '../actions/users';
import * as actions from '../actions/users';
import { SERVER_URL } from '../constants/ActionTypes';


//const SERVER_URL = 'http://inclass-co.herokuapp.com/';//'http://localhost:8000';
//const SERVER_URL = 'http://localhost:8000';

export default function(store) {

  let connected = false;
  let isTyping = false;
  let lastTypingTime;

  console.log('MADE IT YO');
  console.log(store)
  const socket = io.connect(`${SERVER_URL}`);


  // Sets the client's username
  function setUsername (username) { socket.emit('add user', username); }

  // Sets teacher-selected video user and session
  function setTeacherSelectedVideoUser (classUserPac) {
    socket.emit('teacherSelectedVideoUser', classUserPac);
  }

  // Sends a chat message
  function sendMessage (message) { socket.emit('new message', cleanInput(message)); }


  // Prevents input from having injected markup
  function cleanInput (input) { return $('<div/>').text(input).text(); }

  function newClassVideoUser(userPac) {
    console.log(userPac.username + 'isOnVideoChat', userPac)
    store.dispatch(actions.addVideoSession(userPac));
  }


  function login (data) {
    connected = true;
    var message = 'Welcome to the chat stream – ';
    console.log(message, data);
  }

  function newMessage (data) {
    console.log('new message: ', data);
   // $inputMessage.val(cleanInput(data.message));
  }

  function userJoined (data) {
    console.log(data.username + ' joined', data);
    store.dispatch(actions.userJoinedClass(data));
    //userJoinedClass(data);
  }

  function userLeft (data) {
    console.log(data.username + ' left', data);
    userLeftClass(data);
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
    'clean input': cleanInput,
    'teacherSelectedVideoUser': setTeacherSelectedVideoUser

  };


  var socketEvents = {
    'login': login,
    'new message': newMessage,
    'user joined': userJoined,
    'user left': userLeft,
    'typing': typing,
    'stop typing': stopTyping,
    'newClassVideoUser': newClassVideoUser
  };

  for (var key in socketEvents) {
    socket.on(key, socketEvents[key].bind(socket));
  }

  return clientActions;

}
