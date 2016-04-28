import * as types from '../constants/ActionTypes'

export function show() {
  return { type: types.MENU_SHOW };
}

export function hide() {
  return { type: types.MENU_HIDE };
}

export function display(panel) {
  return { type: types.MENU_DISPLAY, panel: panel };
}
