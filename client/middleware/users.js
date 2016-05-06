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

  const socket = io.connect(`${SERVER_URL}`);

  function initializeWebSockets(actions) {
    let userActions = actions.userActions;

    socket.on('users_updateUsers', data => {
      userActions.setUsers(data.users);
    });
  }

  // Sets the client's username
  function setUsername (username) {
    socket.emit('users_addUser', username);
  };

  function getAllUsers() {
    socket.emit('users_getUsers');
  };

  // Sets teacher-selected video user and session
  function setTeacherSelectedVideoUser (classUserPac) {
    socket.emit('teacherSelectedVideoUser', classUserPac);
  };

  function removeUserFromClass(user) {
    socket.emit('users_removeUser', {user});
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

  // @deprecated
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
    'teacherSelectedVideoUser': setTeacherSelectedVideoUser,
    'getAllUsers': getAllUsers,
    'removeUserFromClass': removeUserFromClass,
    'initializeWebSockets': initializeWebSockets
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
