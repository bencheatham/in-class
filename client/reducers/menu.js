import { MENU_SHOW, MENU_HIDE, MENU_DISPLAY } from '../constants/ActionTypes'

var initState = {
  visibility: false,
  panel: ''
};

function menu( state=initState, action) {
  switch (action.type) {
    case MENU_SHOW:
      return { visibility:true, panel: state.panel };
    case MENU_HIDE:
      return { visibility:false, panel: state.panel };
    case MENU_DISPLAY:
      if (state.panel === action.panel && state.visibility) {
        // close the panel if user repeatedly click the same tab
        return { visibility:false, panel: '' };
      }

      return { visibility: true, panel: action.panel };
    default:
      return state;
  }
}

export default menu;
