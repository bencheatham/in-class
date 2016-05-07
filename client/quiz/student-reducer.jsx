import { ANSWER_QUESTION, CLOSE_MODAL, QUIZ_FETCH,START_QUIZ } from './constants';

var dummyStoredQuizzes = {"title":"AnimalTalk","questions":[{"index":1,"question":"What is a dog?","choices":["Red","Green","Orange ","Yellow"],"answer":"Red"},{"index":1,"question":"What is a dog?","choices":["Red","Green","Orange ","Yellow"],"answer":"Red"}]}

var initialState = {
  status: 0,
  answers: [],
  storedQuizzes: dummyStoredQuizzes,
  displayModal: false,
}

export default function quiz(state = initialState, action){

  switch (action.type) {
    case START_QUIZ:
      var newStoredQuizzes = action.quiz;
      var newCount = state.status + 1;
      return {
        status: newCount,
        answers: state.answers,
        storedQuizzes: newStoredQuizzes,
        displayModal: true,
      }
    case ANSWER_QUESTION:   
      var newCount = state.status + 1;
      var newAnswer = state.answers.concat(action.answer);
      return {
        status: newCount,
        answers: newAnswer,
        storedQuizzes: state.storedQuizzes,
        displayModal: state.displayModal,
      }
    case CLOSE_MODAL:
      return {
        status: state.status,
        answers:  state.status,
        storedQuizzes: state.storedQuizzes,
        displayModal: false,
      }
    default: 
      return state;
  }
} 
