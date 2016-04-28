import { DRAWER_SHOW, DRAWER_HIDE, DRAWER_DISPLAY } from '../constants/ActionTypes';

var initState = {
  visibility: false,
  panel: ''
};

function drawer( state=initState, action) {
  switch (action.type) {
    case DRAWER_SHOW:
      return { visibility:true, panel: state.panel };
    case DRAWER_HIDE:
      return { visibility:false, panel: state.panel };
    case DRAWER_DISPLAY:
      if (state.panel === action.panel && state.visibility) {
        // close the panel if user repeatedly click the same tab
        return { visibility:false, panel: '' };
      }

      return { visibility: true, panel: action.panel };
    default:
      return state;
  }
}

export default drawer;
