import { socket } from '../common/socket';

export function initializeWebSockets(actions) {

  socket.on('questionModal_updateNewUser', data => {
    actions.addUsers(data.users);
  });
}


export function emitAddNewUser(username) {
  socket.emit('questionModal_addNewUser', { username });
}
