import * as types from '../constants/ActionTypes'

export function show() {
  return { type: types.MENU_SHOW };
}

export function hide() {
  return { type: types.MENU_HIDE };
}
