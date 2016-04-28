import * as types from '../constants/ActionTypes';

export function show() {
  return { type: types.DRAWER_SHOW };
}

export function hide() {
  return { type: types.DRAWER_HIDE };
}

export function display(panel) {
  return { type: types.DRAWER_DISPLAY, panel: panel };
}
