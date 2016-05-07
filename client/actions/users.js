import * as types from '../constants/ActionTypes';

export function userLogin(user) {
  if(!user || !user.trim()) return;

  return {
    type: types.USER_LOGIN,
    payload: user
  };
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

export function userLeftClass(user) {
  return {
    type: types.USER_LEFT_CLASS,
    user: user
  };
}
