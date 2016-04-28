
import { QUIZ_ACCEPT, QUIZ_REJECT } from '../constants/ActionTypes';

const initState = {
  value: false
};

function quiz(state = initState, action) {
  switch (action.type) {
    case QUIZ_ACCEPT:
      return { value: true };
    case QUIZ_REJECT:
      return { value: false };
    default:
      return state;
  }
}

export default quiz;
