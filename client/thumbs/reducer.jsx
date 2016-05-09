import * as type from './constants';

var initialState = {
  thumbCheck: false,
  displayModal: false,
}

export default function thumbsReducer(state = initialState, action){

  switch (action.type) {
    case type.THUMB_CHECK: 
      return {
        thumbCheck: true,
        displayModal: state.displayModal,
      };
    case type.THUMB_SUBMITTED:
      return {
        thumbCheck: false,
        displayModal: false,
      }
    case type.BEGIN_THUMBCHECK:
      return {
        thumbCheck: state.thumbCheck,
        displayModal: true,
      }
    case type.OPEN_MODAL:
      return {
        thumbCheck: state.thumbCheck,
        displayModal: true,
      }
    case type.HIDE_MODAL:
      return {
        thumbCheck: state.thumbCheck,
        displayModal: false,
      }
    default: 
      return state;
  }
} 
