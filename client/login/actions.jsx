import { LOGIN } from './constants';

export function login(username, type) {
  return {
    type: LOGIN,
    username: username,
  }
}