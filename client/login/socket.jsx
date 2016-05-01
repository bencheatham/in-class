import socket from '../common/socket';

export function initializeWebSockets() {
  // socket.on('login', data => {
  //     //this.props.actions.login(data.username);
  // });
}

export function emitLogin(event){
  socket.emit('login', {
      username : event.target.value
  });
}