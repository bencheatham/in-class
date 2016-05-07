var _ = require('underscore');


var quizEvents = {
  'pop-quiz': broadcastPopQuiz,
}

function broadcastPopQuiz(quiz){
  console.log('pop quiz!!!',quiz);
  this.broadcast.emit('pop-quiz', { quiz: quiz})
}

exports.module = {
 quizEvents: quizEvents,
}