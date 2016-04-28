import { socket } from '../common/socket';

export function initializeWebSockets() {
  socket.on('question-submitted', data => {
    this.props.actions.submitQuestion(null,data.question);
  });
  socket.on('questionWithID', data => {
    this.props.actions.submitQuestion(null,data.question);
  });
  socket.on('upvote', data => {
    console.log('upvote received',data);
    this.props.actions.upvote(data.id, data.username);
  });
};

export function emitNewQuestion(event,name){
  socket.emit('question-submitted', {
      username : name,
      text: event.target.value,
      timestamp: Date.now(),
      upvotes: [],
    });
}

export function emitUpvote(id,username){
  console.log(id,username);
  socket.emit('upvote', {id: id, username: username});
}
  