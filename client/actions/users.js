import * as types from '../constants/ActionTypes';
import initializeUsers from '../middleware/users';

const worker = initializeUsers();

export function userLogin(user) {
  if(!user || !user.trim()) return;

  worker['set username'](user);
  return {
    type: types.USER_LOGIN,
    payload: user
  };
};

export function getOnlineUsers() {
  console.log('hits getOnlineUsers');
  worker['getAllUsers']();
};

export function initializeWebSockets(actions) {
  worker['initializeWebSockets'](actions);
};

// set the users state
export function setUsers(users) {
  return { type: types.USERS_SET_USERS, users: users };
}

export function selectUser(user){
  return {
    type: types.SELECT_USER,
    payload: user
  };
}

export function userJoinedClass(data) {
  return {
    type: types.USER_JOINED_CLASS,
    payload: data.username
  };
}

export function userLeftClass(data) {
  return {
    type: types.USER_LEFT_CLASS,
    payload: data
  };
}
