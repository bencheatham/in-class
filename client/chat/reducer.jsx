//import _ from 'underscore';
var _ = require('underscore')

import {CHAT_MESSAGE} from './constants';


var dummyChat = {
  username : 'sterv',
  text: 'testing1234',
  timestamp: Date.now(),
}

var initialState = {
  chatMessages: [],
}


export function chatReducer(state = initialState, action){

  switch (action.type) {
    case CHAT_MESSAGE:
    console.log('chat messages')

      // var duplicateMesssage = (function () {
      //   _.each(state.chatMessages, (message) => {
      //     if (message.id === action.chatMessage.id){
      //       return true
      //     }
      //   })
      //   return false;
      // })()
      
      // if (duplicateMesssage){
      //   var newChatMessages = state.chatMessages.concat(action.chatMessage);  
      // } else {
      //   newChatMessages = state.chatMessages;
      // }
        var newChatMessages = state.chatMessages.concat(action.chatMessage);  

      return {
        chatMessages: newChatMessages,
      }
    default: 
      return state;
  }
} 

export default chatReducer;