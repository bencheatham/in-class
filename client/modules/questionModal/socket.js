import { connectToWebSockets } from '../../common/socket';

var socket;

export function initializeWebSockets(actions) {
  socket = connectToWebSockets();

  // let videoActions = actions.videoActions;
  let modalActions = actions.modalActions;

  socket.on('questionModal_updateNewUser', data => {
    modalActions.addUsers(data.users);
  });

  socket.on('questionModal_getNextUser', data => {
    if (data.user) {
      modalActions.dequeueUser(data.user);
    } else {
      console.log('possible error detected');
      return;
    }
    modalActions.dequeueUser(data.user);
  });

  socket.on('questionModal_setUsers', data => {
    modalActions.setUsers(data.users);
  });
};

export function closeWebSockets(){
  socket.disconnect();
};

export function emitAddNewUser(username) {
  socket.emit('questionModal_addNewUser', { username });
};

export function dequeueUser() {
  socket.emit('questionModal_dequeueUser');
};

export function emitRemoveUser(username) {
  if (!username) return;
  socket.emit('questionModal_removeUser', {username});
};
