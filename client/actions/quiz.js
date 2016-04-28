import * as types from '../constants/ActionTypes'

export function accept() {
  return { type: types.QUIZ_ACCEPT};
}

export function reject() {
  return { type: types.QUIZ_REJECT };
}

