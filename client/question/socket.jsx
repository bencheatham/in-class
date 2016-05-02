import { socket } from '../common/socket';

export function initializeWebSockets() {

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

export function emitNewQuestion(text,name){
  socket.emit('question-submitted', {
      username : name,
      text: text,
      timestamp: Date.now(),
      upvotes: [],
    });
}

export function emitUpvote(id,username){
  console.log(id,username);
  socket.emit('upvote', {id: id, username: username});
}
  