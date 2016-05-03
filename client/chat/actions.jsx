import { CHAT_MESSAGE } from './constants';

export function submitChat(chatMessage) {
    
  return {
    type: CHAT_MESSAGE,
    chatMessage: chatMessage,
  }
}

export function loadChatMessages(chatLog) {
    
  return {
    type: CHAT_MESSAGE,
    chatMessage: chatLog,
  }
}
