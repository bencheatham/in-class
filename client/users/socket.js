import { socket } from '../common/socket';

export function initializeWebSockets(actions) {
  let userActions = actions.userActions;

  socket.on('users_updateUsers', data => {
    userActions.setUsers(data.users);
  });
}

// Sets the client's username
export function emitAddUserToClass (user) {
  socket.emit('users_addUser', user);
};

export function emitGetAllUsersFromClass() {
  socket.emit('users_getUsers');
};

// Sets teacher-selected video user and session
export function setTeacherSelectedVideoUser (classUserPac) {
  socket.emit('teacherSelectedVideoUser', classUserPac);
};

export function emitRemoveUserFromClass(user) {
  socket.emit('users_removeUser', user);
}
