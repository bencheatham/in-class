import * as type from './constants';

var dummyStoredQuizzes = {"title":"AnimalTalk","questions":[{"index":1,"question":"What is a dog?","choices":["Red","Green","Orange ","Yellow"],"answer":"Red"},{"index":1,"question":"What is a dog?","choices":["Red","Green","Orange ","Yellow"],"answer":"Red"}]}

var initialState = {
  status: 0,
  answers: [],
  storedQuizzes: [],
  displayModal: false,
  quizLive: false,
}

export default function quiz(state = initialState, action){

  switch (action.type) {
    case type.STORE_QUIZ:
      var newStoredQuizzes = action.quiz;
      return {
        ...state,
        storedQuizzes: newStoredQuizzes,
        quizLive: true,
        status: 0,
      }
    case type.ANSWER_QUESTION:   
      var newCount = state.status + 1;
      var newAnswer = state.answers.concat(action.answer);
      return {
        ...state,
        status: newCount,
        answers: newAnswer,
      }
    case type.OPEN_STUDENT_MODAL:
      return {
        ...state,
        displayModal: true,
    }
    case type.CLOSE_STUDENT_MODAL:
      return {
        ...state,
        displayModal: false,
    }
    case type.END_QUIZ:
      return {
        ...state,
        answers: [],
        quizLive: false,
      }
    default: 
      return state;
  }
} 
