import { io } from '../../common/socket';

export function initializeWebSockets(actions) {
  io.on('questionModal_updateNewUser', data => {
    actions.addUsers(data.users);
  });
}


export function emitAddNewUser(username) {
  io.emit('questionModal_addNewUser', { username });
}
