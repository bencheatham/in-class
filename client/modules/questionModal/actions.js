import * as types from './constants';

export function show() {
  return { type: types.QUESTION_MODAL_SHOW };
}

export function hide() {
  return { type: types.QUESTION_MODAL_HIDE };
}

export function addUser(username) {
  return { type: types.QUESTION_MODAL_ADD_USER, username };
}

export function addUsers(users) {
  return { type: types.QUESTION_MODAL_ADD_USERS, users };
}

export function dequeueUser(user) {
  return { type: types.QUESTION_MODAL_DEQUEUE, user };
}

export function setUsers(users) {
  return { type: types.SET_USERS, users };
}
