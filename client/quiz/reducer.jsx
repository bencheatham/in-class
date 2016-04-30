import { QUIZ_SUBMISSION, QUIZ_FETCH, ADD_QUIZFORM, UPDATE_QUIZ} from './constants';

var initialState = {
  quizzes: [],
  questionForms: 1,
}

export default function quiz(state = initialState, action){

  switch (action.type) {
    case QUIZ_SUBMISSION:
      // var newQuizzes = state.quizzes.concat(action.formData);
      return {
        quizzes: state.quizzes,
        questionForms: state.questionForms,
      }
    case UPDATE_QUIZ:
      var updatedQuizzes;
      if (state.quizzes.length < state.questionForms){
        updatedQuizzes = state.quizzes.concat(action.formData);  
      } else {
        updatedQuizzes = state.quizzes.map(function(quiz){
          if (quiz.id === action.formData.id){
            return action.formData;
          }
            return quiz;
          })
        }
      
      return {
        quizzes: updatedQuizzes,
        questionForms: state.questionForms,
      }
    case ADD_QUIZFORM:   
      var newCount = state.questionForms + 1;
      return {
        quizzes: state.quizzes,
        questionForms: newCount,
      }
    default: 
      return state;
  }
} 
