import * as types from '../constants/ActionTypes';
import initializeUsers from '../middleware/users';

const worker = initializeUsers();

export function userLogin(user) {

  // TODO make the socket call to broadcast to everyone
  worker['set username'](user);
 return {
   type: types.USER_LOGIN,
   payload: user
 };
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
