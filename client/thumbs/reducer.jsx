import { THUMB_CHECK, THUMB_SUBMITTED } from './constants';

var initialState = {
  thumbCheck: false,
}

export default function thumbsReducer(state = initialState, action){

  switch (action.type) {
    case THUMB_CHECK: 
      return {
        thumbCheck: true,
      };
    case THUMB_SUBMITTED:
      return {
        thumbCheck: false,
      }
    default: 
      return state;
  }
} 
