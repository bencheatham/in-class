import * as types from '../constants/ActionTypes';

export function show() {
  return { type: types.USER_VIDEO_MODAL_SHOW };
}

export function hide() {
  return { type: types.USER_VIDEO_MODAL_HIDE };
}
