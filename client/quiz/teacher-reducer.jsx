import * as type from './constants';

var dummyEdit = {
  title: 'Redux',
  questions: [
    {
      answer: 'plugin',
      choices: ['plugin','Framework','Module','Code'],
      index: 0,
      question: 'What is Redux?',
    }
  ]
}

var initialState = {
  quizzes: [],
  questionForms: 1,
  quizList: null,
  quizToEdit: null,
  displayModal: false,
  quizResults: [],
}

export default function quiz(state = initialState, action){
  switch (action.type) {
    case type.QUIZ_SENT_TO_STUDENTS:
      return {
        ...state,
        displayModal: false,
      }
    case type.QUIZ_SUCCESSFULLY_SAVED:
      return {
        ...state,
        quizToEdit: {},
        questionForms: 1,
        displayModal: false,
      }
    case type.FETCH_QUIZ_LIST: 
      return {
        ...state,
        quizList: action.quizList,
      };
    case type.LOAD_QUIZ_IN_EDITOR: 
      return {
        ...state,
        quizToEdit: action.quiz,
      };
    case type.UPDATE_QUIZ_IN_EDITOR:
      var updatedQuestions = state.quizToEdit.questions.map(function(question){
          if (question.index === action.formData.index){
            return action.formData;
          }
            return question;
          })

      var quizToEdit = {
        title: state.quizToEdit.title,
        questions: updatedQuestions,
      }

      return {
        ...state,
        quizToEdit: quizToEdit,
      }
    case type.ADD_QUESTION_IN_EDITOR:
      var quizToEdit = {
        title: state.quizToEdit.title,
        questions: state.quizToEdit.questions.slice().concat({
          answer: '',
          choices: ['','','',''],
          index: state.quizToEdit.questions.length,
          question: '',
        })
      }
      return {
        ...state,
        quizToEdit:quizToEdit,
      }
    case type.ADD_QUESTION_IN_CREATOR:   
      var newCount = state.questionForms + 1;
      return {      
        ...state,
        questionForms: newCount,      
      }
    case type.UPDATE_TITLE_IN_EDITOR:
      var quizToEdit = {
        title: action.newTitle,
        questions: state.quizToEdit.questions,
      }

      return {
        ...state,
        quizToEdit:quizToEdit,
      }
    case type.UPDATE_QUESTION_IN_CREATOR:
      var updatedQuiz;
      if (state.quizzes.length < state.questionForms){
        updatedQuiz = state.quizzes.concat(action.formData);  
      } else {
        updatedQuiz = state.quizzes.map(function(quiz){
          if (quiz.index === action.formData.index){
            return action.formData;
          }
            return quiz;
          })
        }
        console.log('updatedQuiz',updatedQuiz)
      return {        
        ...state,
        quizzes: updatedQuiz,
      }
    case type.DISPLAY_RESULTS_FROM_QUIZ: 
      return {
        ...state,
        quizResults: action.payload,
      }
    case type.DELETE_QUIZ: 
      var quizList = state.quizList.slice();
      quizList.splice(quizList.indexOf(action.quizName),1);
      return {
        ...state,
        quizList,
      }
    case type.OPEN_TEACHER_MODAL:
      return {
          ...state,
          displayModal: true,
        };
    case type.CLOSE_TEACHER_MODAL:
      return {
        ...state,
        displayModal: false,
      };
    default: 
      return state;
  }
} 


