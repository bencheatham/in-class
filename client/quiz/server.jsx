var _ = require('underscore');


var quizEvents = {
  'pop-quiz': broadcastPopQuiz,
}

function broadcastPopQuiz(quizName){
  this.broadcast.emit('pop-quiz', { file: quizName})
}

exports.module = {
 quizEvents: quizEvents,
}