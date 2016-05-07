var _ = require('underscore');

var questionLog = [];

var questionEvents = {
  'question-submitted': questionSubmitted,
  'upvote': upvote,
  'init-questions': initializeQuestions,
}

function initializeQuestions (){
  console.log('sending all questions')
  this.emit('init-questions', { questionLog: questionLog});
}

function upvote (data){
  var id = data.id;
  var username = data.username;
  var alreadyVoted = _.contains(questionLog[id].upvotes, username);
    
  if (alreadyVoted){
    this.emit('failed-upvote', { message: 'You already voted!'});
  } else {
    this.emit('upvote', { id: id, username: username })
    this.broadcast.emit('upvote', { id: id, username: username })
    questionLog[id].upvotes.push(username);  
    console.log('upvote received',questionLog[id].upvotes);
  }
}

function questionSubmitted(question){
  question = _.extend(question,{
    id: questionLog.length
  })
  console.log('question about to be broadcasted',question)

  this.emit('question-returned-with-id', { question: question})
  this.broadcast.emit('question-submitted', { question: question});
  questionLog.push(question);
}

exports.module = {
 questionEvents: questionEvents,
 questionLog: questionLog
}