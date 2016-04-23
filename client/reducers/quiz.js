import { QUIZ_ACCEPT, QUIZ_REJECT } from '../constants/ActionTypes'

const initState = {
  value: false
}

const quiz = (state = initState, action) => {
  switch (action.type) {
    case QUIZ_ACCEPT:
      state.value = true;
      return state;
    case QUIZ_REJECT:
      state.value = false;
      return state;
    default:
      return state;
  }
}

export default quiz;
