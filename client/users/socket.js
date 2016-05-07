import { socket } from '../common/socket';

export function initializeWebSockets(actions) {
  let userActions = actions.userActions;

  socket.on('users_updateUsers', data => {
    userActions.setUsers(data.users);
  });
}

// emit socket call to add user to class
export function emitAddUserToClass (user) {
  socket.emit('users_addUser', user);
};

// emit socket call to get users from class
export function emitGetAllUsersFromClass() {
  socket.emit('users_getUsers');
};

// Sets teacher-selected video user and session
export function setTeacherSelectedVideoUser (classUserPac) {
  socket.emit('teacherSelectedVideoUser', classUserPac);
};

// emit socket call to remove user from class
export function emitRemoveUserFromClass(user) {
  socket.emit('users_removeUser', user);
}
