import { socket } from '../../common/socket';

export function initializeWebSockets(actions) {

  let videoActions = actions.videoActions;
  let modalActions = actions.modalActions;

  socket.on('questionModal_updateNewUser', data => {
    modalActions.addUsers(data.users);
  });

  socket.on('questionModal_getNextUser', data => {
    if (data.user) {
      modalActions.dequeueUser(data.user);
      // TODO grab the user name produce video selection
      // ACTIONS needed to update the video session here!
      videoActions.switchVideoByUsername(data.user);

    } else {
      console.log('possible error detected');
    }
  });
}


export function emitAddNewUser(username) {
  socket.emit('questionModal_addNewUser', { username });
}

export function dequeueUser() {
  socket.emit('questionModal_dequeueUser');
}
