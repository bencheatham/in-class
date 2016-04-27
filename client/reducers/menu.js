import { MENU_SHOW, MENU_HIDE } from '../constants/ActionTypes'

function menu( state={ visibility:false }, action) {
  switch (action.type) {
    case MENU_SHOW:
      return { visibility:true };
    case MENU_HIDE:
      return { visibility:false };
    default:
      return state;
  }
}

export default menu;
