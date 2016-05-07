//import _ from 'underscore';
var _ = require('underscore')

import {CHAT_MESSAGE, INITIALIZE_CHAT} from './constants';

var initialState = {
  chatMessages: [],
}

export function chatReducer(state = initialState, action){

  switch (action.type) {
    case CHAT_MESSAGE:
        var newChatMessages = state.chatMessages.concat(action.chatMessage);  
      return {
        chatMessages: newChatMessages,
      }
    case INITIALIZE_CHAT:
        var newChatMessages = action.chatMessage;
      return {
        chatMessages: newChatMessages,
      }
    default: 
      return state;
  }
} 

export default chatReducer;