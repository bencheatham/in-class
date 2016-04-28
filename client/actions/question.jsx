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

var dummy_question = {
  id: 12,
  username : 'stephen',
  text: 'I dont understand anything',
  timestamp: 1461619497989,
  upvotes: 3,
  downvotes: 4
}

export function upvote(question_id) {
  // socket.emit('upvote', 
  //   {
  //     username: username,
  //     thumb: thumb   
  //   });

  return (dispatch, getState) => {
     
    return dispatch({
      type: UPVOTE,
      question_id: question_id
    });
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

    if (text !== null){
      var question = {
          username: 'sterv',
          id: 1,
          text: text,
          timestamp: Date.now(),
          upvotes: 0,
          downvotes: 0
        };
        console.log('about to emit question');
      emitNewQuestion(question);
    }
    
    console.log('about to update question state',question)
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






