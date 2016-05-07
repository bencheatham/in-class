import { CHAT_MESSAGE, INITIALIZE_CHAT} from './constants';

export function submitChat(chatMessage) {
    
  return {
    type: CHAT_MESSAGE,
    chatMessage: chatMessage,
  }
}

export function loadChatMessages(chatLog) {
    
  return {
    type: INITIALIZE_CHAT,
    chatMessage: chatLog,
  }
}
