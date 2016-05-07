import { ANSWER_QUESTION, QUIZ_FETCH,START_QUIZ } from './constants';

var initialState = {
  status: 0,
  answers: [],
  storedQuizzes: [],
}

export default function quiz(state = initialState, action){

  switch (action.type) {
    case START_QUIZ:
    console.log('reducer')
      var newStoredQuizzes = state.storedQuizzes.concat(action.storedQuizzes);
      var newCount = state.status + 1;
      return {
        status: newCount,
        answers: state.answers,
        storedQuizzes: newStoredQuizzes,
      }
    case ANSWER_QUESTION:   
      var newCount = state.status + 1;
      var newAnswer = state.answers.concat(action.answer);
      return {
        status: newCount,
        answers: newAnswer,
        storedQuizzes: state.storedQuizzes,
      }
    default: 
      return state;
  }
} 
