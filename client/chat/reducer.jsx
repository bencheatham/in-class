//import _ from 'underscore';
var _ = require('underscore')

import {CHAT_MESSAGE} from './constants';


var dummyChat = {
  username : 'sterv',
  text: 'testing1234',
  timestamp: Date.now(),
}

var initialState = {
  chatMessages: [dummyChat],
}


export function chatReducer(state = initialState, action){

  switch (action.type) {
    case CHAT_MESSAGE:
      var newChatMessages = state.chatMessages.concat(action.chatMessage)
      return {
        chatMessages: newChatMessages,
      }
    default: 
      return state;
  }
} 

export default chatReducer;