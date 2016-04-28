var _ = require('underscore');

var questionCount = 0;

var questionEvents = {
  'question-submitted': questionSubmitted,
  'upvote': upvote,
  'login': login,
}

function login (data){
  this.emit('login', {
    username: data.username
  })
  this.broadcast.emit('login', {
    username: data.username
  })
}

function upvote (id){
  this.emit('upvote', {
    id: id
  })
  this.broadcast.emit('upvote', {
    id: id
  })
}

function questionSubmitted(question){
  questionCount++;
  question = _.extend(question,{
    id: questionCount
  })
  console.log('question about to be broadcasted',question)

  this.emit('questionWithID', { question: question})
  this.broadcast.emit('question-submitted', { question: question});
}

exports.module = {
 questionEvents: questionEvents,
 questionCount: questionCount
}
