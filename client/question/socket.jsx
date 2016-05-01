import { socket } from '../common/socket';

export function initializeWebSockets() {

  socket.on('question-submitted', data => {
    console.log('init websockets ... question-submitted',this)
    this.props.actions.submitQuestion(null,data.question);
  });
  socket.on('questionWithID', data => {
    console.log('init websockets... questionWithID',this)
    this.props.actions.submitQuestion(null,data.question);
  });
  socket.on('upvote', data => {
    console.log('init websockets... UPVOTE',this)
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
  