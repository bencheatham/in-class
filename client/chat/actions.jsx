import { CHAT_MESSAGE } from './constants';

export function submitChat(chatMessage) {
    
  return {
    type: CHAT_MESSAGE,
    chatMessage: chatMessage,
  }
}