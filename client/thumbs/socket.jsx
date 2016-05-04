import { socket } from '../common/socket';

export function initializeWebSockets() {

  socket.on('thumbCheck', () => {
    this.props.actions.thumbCheck();
  });

  socket.on('thumb-student', data => {    
    this.props.actions.thumb(data.id,data.username,data.value);
  });
};

export function emitThumbEvent(value,name,id){
  socket.emit('thumb-student', {
      username : name,
      thumb: value,
      timestamp: Date.now(),
      id: id,
    });
  this.props.actions.submitThumb();
}

export function emitThumbCheck(username){
  socket.emit('thumbCheck', {username:username});
  this.props.actions.thumbCheck();
}