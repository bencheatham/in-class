/*globals $*/
import io from 'socket.io-client';
import { userJoinedClass } from '../actions/users';
import { userLeftClass } from '../actions/users';
import * as actions from '../actions/users';
import * as vidActions from '../modules/video/actions';



//const SERVER_URL = 'http://inclass-co.herokuapp.com/';//'http://localhost:8000';
//const SERVER_URL = 'http://localhost:8000';

export default function(store) {

  let connected = false;
  let isTyping = false;
  let lastTypingTime;


  // Prevents input from having injected markup
  function cleanInput (input) { return $('<div/>').text(input).text(); }

  function newClassVideoUser(userPac) {
    userPac.videoSession = $(userPac.videoSession)[0]
    console.log(userPac.speaker + ' isOnVideoChat', userPac)
    if(store){
      store.dispatch(vidActions.addClassVideoSession(userPac));
    }

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
    if(store){
      store.dispatch(actions.userJoinedClass(data));
    }
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
    'clean input': cleanInput,
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

  return clientActions;

}
