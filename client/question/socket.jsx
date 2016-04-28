var socket = require('socket.io-client');

export var socket = socket().connect('http://localhost:8000');

var serverEvents = {
  'question-submitted': updateQuestionsList,
  'upvote': updateVotes
};

function initiateWebSocketListeners(){

}
socket.on('question-submitted', data => {
  this.props.actions.submitQuestion(null,data.question)
});
socket.on('questionWithID', data => {
  this.props.actions.submitQuestion(null,data.question)
});
socket.on('upvote', data => {
  this.props.actions.upvote(data.id.id)
});