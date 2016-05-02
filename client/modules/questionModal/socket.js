import { socket } from '../../common/socket';

export function initializeWebSockets(actions) {
  socket.on('questionModal_updateNewUser', data => {
    actions.addUsers(data.users);
  });
}


export function emitAddNewUser(username) {
  io.emit('questionModal_addNewUser', { username });
}
