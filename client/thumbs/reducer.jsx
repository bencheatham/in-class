import { THUMB_CHECK, THUMB_SUBMITTED, BEGIN_THUMBCHECK, HIDE_MODAL} from './constants';

var initialState = {
  thumbCheck: false,
  displayModal: false,
}

export default function thumbsReducer(state = initialState, action){

  switch (action.type) {
    case THUMB_CHECK: 
      return {
        thumbCheck: true,
        displayModal: state.displayModal,
      };
    case THUMB_SUBMITTED:
      return {
        thumbCheck: false,
        displayModal: false,
      }
    case BEGIN_THUMBCHECK:
      return {
        thumbCheck: state.thumbCheck,
        displayModal: true,
      }
    case HIDE_MODAL:
      return {
        thumbCheck: state.thumbCheck,
        displayModal: false,
      }
    default: 
      return state;
  }
} 
