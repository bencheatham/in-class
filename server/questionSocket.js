var questionCount = 0;

var questionEvents = {
  'question-submitted': questionSubmitted
}

function questionSubmitted(question){
  console.log('question about to be broadcasted',question)
  this.broadcast.emit('question-submitted', { question: question});
}

exports.module = {
 questionEvents: questionEvents,
 questionCount: questionCount
}