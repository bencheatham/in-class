import { EDIT_QUIZ, QUIZ_SUBMISSION, QUIZ_FETCH, ADD_QUIZFORM, UPDATE_QUIZ} from './constants';

var initialState = {
  quizzes: [],
  questionForms: 1,
  editingQuiz: false,
  quizToEdit: [],
}

export default function quiz(state = initialState, action){

  switch (action.type) {
    case 'ALL_QUIZZES': 
      return {
        quizzes: action.quizzes,
        questionForms: state.questionForms,
        editingQuiz: state.editingQuiz,
        quizToEdit: state.quizToEdit,
      };
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
        editingQuiz: state.editingQuiz,
        quizToEdit: state.quizToEdit,
      }
    case ADD_QUIZFORM:   
      var newCount = state.questionForms + 1;
      return {
        quizzes: state.quizzes,
        questionForms: newCount,
        editingQuiz: state.editingQuiz,
        quizToEdit: state.quizToEdit,
      }
    case EDIT_QUIZ:   
      var newQuizToEdit = state.quizToEdit.concat(action.quiz);
      return {
        quizzes: state.quizzes,
        questionForms: state.questionForms,
        editingQuiz: !state.editingQuiz,
        quizToEdit: newQuizToEdit,
      }
    default: 
      return state;
  }
} 
