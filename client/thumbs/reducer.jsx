import * as type from './constants';
import _ from 'lodash';

var initialState = {
  thumbCheck: false,
  displayModal: false,
  thumbResults: {up: 0, neutral: 0, down: 0}
};

export default function thumbsReducer(state = initialState, action){

  switch (action.type) {
    case type.THUMB_CHECK: 
      return {
        ...state,
        thumbCheck: true
      };
    case type.THUMB_SUBMITTED:
      return {
        ...state,
        thumbCheck: false,
        displayModal: false
      }
    case type.BEGIN_THUMBCHECK:
      return {
        ...state,
        displayModal: true
      }
    case type.END_THUMBCHECK:
      return {
        ...state,
        displayModal: false,
        thumbCheck: false
      }
    case type.OPEN_MODAL:
      return {
        ...state,
        displayModal: true
      }
    case type.HIDE_MODAL:
      return {
        ...state,
        displayModal: false
      }
    case type.THUMB_RESET:
      var thumbResults = {up: 0, neutral: 0, down: 0};
      return {
        ...state,
        thumbResults
      }
    case type.THUMB_RESULT:
      var thumbResults = _.extend({}, state.thumbResults);
      thumbResults[action.result]++;
      return {
        ...state,
        thumbResults
      }
    default: 
      return state;
  }
} 
