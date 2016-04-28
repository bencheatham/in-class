export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const CHAT_MESSAGE = 'CHAT_MESSAGE';
export const QUESTION = 'QUESTION';
var socket = require('socket.io-client');

export var socket = socket().connect('http://localhost:8000');

var serverEvents = {
  'question-submitted': updateQuestionsList,
  'upvote': updateVotes
};

export function upvote(id) {
     
    return {
      type: UPVOTE,
      id: id
    };
}

export function downvote(question_id) {
  return (dispatch, getState) => {
     
    return dispatch({
      type: DOWNVOTE,
      question_id: question_id
    });
  };
}

export function submitQuestion(text, question) {
    
  return {
    type: QUESTION,
    question: question,
  }
}

export const initializeWebSockets = () => {
  for (var key in serverEvents) { 
    socket.on(key, serverEvents[key].bind(socket)); 
  }
};

function emitNewQuestion(question){
  socket.emit('question-submitted',question);
};

function updateQuestionsList(question){
  console.log('client received event => question-submitted',question.question)
  submitQuestion(null,question.question);
}

function updateVotes(){
  // upvote 
}






