import { QUIZ_ACCEPT, QUIZ_REJECT } from '../constants/ActionTypes'

const initialState = {
  
}

const quiz = (state = initialState, action) => {
  switch (action.types) {
    case QUIZ_ACCEPT:
    case QUIZ_REJECT:
    default:
      return state
  }
}

export default quiz
