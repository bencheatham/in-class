import { connectToWebSockets } from '../common/socket';

var socket;

export function initializeWebSockets() {
  socket = connectToWebSockets();
  
  socket.on('init-questions', (data) => {
    this.props.actions.loadQuestions(data.questionLog);
  });

  socket.on('question-submitted', data => {
    this.props.actions.submitQuestion(data.question);
  });

  socket.on('question-returned-with-id', data => {
    this.props.actions.submitQuestion(data.question);
  });

  socket.on('upvote', data => {    
    this.props.actions.upvote(data.id, data.username);
  });
};

export function closeWebSockets(){
  socket.disconnect();
}

export function emitNewQuestion(text,name){
  socket.emit('question-submitted', {
      username : name,
      text: text,
      timestamp: Date.now(),
      upvotes: [],
    });
}

export function emitUpvote(id,username){
  socket.emit('upvote', {id: id, username: username});
}

export function loadQuestions(){
  socket.emit('init-questions', {});
}
  