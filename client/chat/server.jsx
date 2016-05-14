var _ = require('underscore');

var chatLog = [];

function wipeChatLog () { chatLog = []; }

var chatEvents = {
  'chatMessage-submitted': chatSubmitted,
  'init-chat': initializeChat,
  'wipe-chat': wipeChatLog
}

function initializeChat (){
  this.emit('init-chat', { chatLog: chatLog});
}

function chatSubmitted(chatMessage){
  console.log('chat submitted',chatMessage);
  
  chatMessage = _.extend(chatMessage,{
    id: chatLog.length
  })
  
  this.emit('chatMessage-submitted', { chatMessage: chatMessage});
  this.broadcast.emit('chatMessage-submitted', { chatMessage: chatMessage});
  chatLog.push(chatMessage);
}

exports.module = {
 chatEvents: chatEvents,
 chatLog: chatLog
}