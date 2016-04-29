import const { QUIZ_SUBMISSION, QUIZ_FETCH, ADD_QUIZ} from './constants';

var initialState = {
  quizzes: [],
  quizSize: 1,
}

var example = [
  {
    question: "What color is the blowfish",
    options: ['red','blue','green','orange'],
    answer: 2,
  },
  {
    question: "What color is the blowfish",
    options: ['red','blue','green','orange'],
    answer: 2,
  }
];


function quiz(state = initialState, action){

  switch (action.type) {
    case QUIZ_SUBMISSION:
      
      return {
        quizzes: state.quizzes,
        quizSize: state.quizSize,
      }
    case QUIZ_FETCH: 
      
      return {
        quizzes: state.quizzes,
        quizSize: state.quizSize,
      }
    case ADD_QUIZ}:   
      var newCount = state.quizSize++;
      return {
        quizzes: state.quizzes,
        quizSize: newCount,
      }
    default: 
      return state;
  }
} 

export default quiz;

