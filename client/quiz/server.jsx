var _ = require('underscore');


var quizEvents = {
  'pop-quiz': broadcastPopQuiz,
}

function broadcastPopQuiz(quizName){
  console.log('pop quiz!!!',quizName);
  this.broadcast.emit('pop-quiz', { file: quizName})
}

exports.module = {
 quizEvents: quizEvents,
}