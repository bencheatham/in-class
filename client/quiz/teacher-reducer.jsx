import * as type from './constants';

var initialState = {
  quizzes: [],
  questionForms: 1,
  editingQuiz: false,
  quizToEdit: [],
  displayModal: false,
  quizResults: [],
}

export default function quiz(state = initialState, action){
  switch (action.type) {
    case 'ALL_QUIZZES': 
      return {
        ...state,
        quizzes: action.quizzes,
      };
    case type.UPDATE_QUIZ:
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
        ...state,
        quizzes: updatedQuizzes,
      }
    case type.DISPLAY_RESULTS: 
      return {
        ...state,
        quizResults: action.payload,
      }
    case type.ADD_QUIZFORM:   
      var newCount = state.questionForms + 1;
      return {      
        ...state,
        questionForms: newCount,      
      }
    case type.EDIT_QUIZ:   
      var newQuizToEdit = state.quizToEdit.concat(action.quiz);
      return {
        ...state,
        editingQuiz: !state.editingQuiz,
        quizToEdit: newQuizToEdit,
      }
    case type.OPEN_TEACHER_MODAL:
      return {
          ...state,
          quizzes: action.quizzes,
          displayModal: true,
        };
    case type.CLOSE_TEACHER_MODAL:
      return {
        ...state,
        quizzes: action.quizzes,
        displayModal: false,
      };
    default: 
      return state;
  }
} 


