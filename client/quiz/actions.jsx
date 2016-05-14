import axios from 'axios';
import _ from 'underscore';
import * as type from './constants';
import { hashHistory } from 'react-router';

/* teacher actions */
export function saveQuizInDatabase (quizTitle,quizData,update) {
  var data= {title: quizTitle, questions: quizData};
  console.log(data);
  return (dispatch,getState) => {
    axios.post('/save', {quiz: data, update: update}).then(function(response){
      console.log('response from API',response);
      if (response.status === 201){
        dispatch({
          type: type.QUIZ_SUCCESSFULLY_SAVED, 
        });
        hashHistory.push('/classroom/' + getState().user.usertype);
      }
    })
    .catch(function(error){
        return {
          type: type.ERROR_MESSAGE,
          payload: error,
        }
    });
  }
}

export function fetchQuizList (){
  return axios.get('/fetch', {params: {title: 'manifest'}})
  .then(function(response){
      return {
        type: type.FETCH_QUIZ_LIST,
        quizList: response.data
      };    
  })
  .catch(function(response){
      console.log('error fetching all quizzes',response);
      return {
         type: 'FAILED_QUIZ_FETCH'
      }
  });
}

export function storePopQuiz(quizData) {
  console.log('quizData',quizData);
  var questionsWithShuffledChoices = _.map(quizData.quiz.questions,(question)=>{
    return {
      answer: question.answer,
      choices: _.shuffle(question.choices),
      index: question.index,
      question: question.question,
    }
  })

  var newQuiz = {
    quiz: {
      questions: questionsWithShuffledChoices,
      title: quizData.quiz.title
    },
    teachername: quizData.teachername
  }

  return (dispatch,getState) => {
    if (getState().user.usertype === 'student'){
      dispatch({
        type: type.STORE_QUIZ,
        quiz: newQuiz,
      });
    } else {
      dispatch({
        type: type.QUIZ_SENT_TO_STUDENTS
      })
    }
  }
}

export function addQuizForm () {
  return {
    type: type.ADD_QUESTION_IN_CREATOR,
  }
}

export function updateQuestionData (formData) {

 return {
  type: type.UPDATE_QUESTION_IN_CREATOR,
  formData: formData,
 }
}

export function updateEditQuiz (formData) {
  return {
    type: type.UPDATE_QUIZ_IN_EDITOR,
    formData: formData,
  }
}

export function deleteQuiz (quizName) {
  return axios.post('/delete', {title: quizName})
  .then(function(response){
  
    return {
      type: type.DELETE_QUIZ,
      quizName,
    }
  })
  .catch(function(response){
    console.log('error deleting quiz',response);
    return {
      type: 'ERROR_DELETING QUIZ'
    }
  })
}

export function loadQuiz (quizName) {
  console.log('quiz name to edit',quizName);

  return (dispatch,getState) => {
    axios.get('/fetch', {params: {title: quizName}})
    .then(function(response){       
      var quiz = response.data;
    
      dispatch({
        type: type.LOAD_QUIZ_IN_EDITOR,
        quiz: quiz,
      });
      hashHistory.push('/edit');
      
    })
    .catch(function(response){
      console.log('error fetching quiz names',response);
    })
  }
}

export function answerQuestion (answer,lastQuestion) {
  
  return (dispatch, getState) => {
    
    var quizLength = getState().studentQuiz.storedQuizzes.quiz.questions.length;
    var currentStatus = getState().studentQuiz.status;
    var teachername = getState().studentQuiz.storedQuizzes.teachername;
    var quizTitle = getState().studentQuiz.storedQuizzes.quiz.title;
    var lastQuestion = currentStatus + 1 === quizLength;
    
    dispatch ({
        type: type.ANSWER_QUESTION,
        answer: answer
    });  

    var answers = getState().studentQuiz.answers;
    
    if (lastQuestion){
      dispatch ({
          type: type.END_QUIZ,
      });

      let postData = {quizTitle, teachername, answers}
      console.log(postData);
      postAnswers(quizTitle,teachername,answers)

    }
  }
}

export function openTeacherQuizModal(){
  return {
    type: type.OPEN_TEACHER_MODAL, 
  }
}

export function closeTeacherQuizModal(){
  return {
    type: type.CLOSE_TEACHER_MODAL, 
  }
}

export function fetchResults(quizName) {
   return axios.get('/fetch', {params: {title: quizName, answers: true}})
  .then(function(response){
    console.log('response from API',response);
      return {
        type: type.DISPLAY_RESULTS_FROM_QUIZ,
        payload: response.data
      };
    
  })
  .catch(function(response){
      console.log('error fetching results',response);
      return {
        type: type.DISPLAY_RESULTS_FROM_QUIZ,
      }
  });

  return {
    type: type.ANSWER_QUESTION,
    answer: answer
  }
}

export function postAnswers(quizTitle, teachername, answers){

  answers = answers.map((answer,index) => {
    return {
      index: index,
      answer: answer,
    }
  });
  
  var data = {
    title: quizTitle,
    teachername: teachername, 
    answers: answers
  };

  console.log('posting answers',data)
  return axios.post('/save', {answers: data}).then(function(response){
    console.log(response)
    if (response.status === 201){
      return {
         type: 'ANSWERS_STORED',
      };
    }
  })
  .catch(function(response){
      console.log('error posting answer',response);
      return {
        type: 'ERROR_POSTING_ANSWERS',
      }
  });
}

export function updateState (data) {
  return (dispatch) => {
    axios.get
    dispatch({
      type: type.LOAD_QUIZ,
      quizzes: data
    })
  }
}

export function addNewQuestion () {
  return {
    type: type.ADD_QUESTION_IN_EDITOR,
  }
}

export function changeTitle (title) {
  return {
    type: type.UPDATE_TITLE_IN_EDITOR,
    newTitle: title,
  }
}

export function openStudentQuizModal(){
  return {
    type: type.OPEN_STUDENT_MODAL, 
  }
}

export function closeStudentQuizModal(){
  return {
    type: type.CLOSE_STUDENT_MODAL, 
  }
}

export function x(){
  return (dispatch,getState) => {
    dispatch({
      type: type.QUIZ_SENT_TO_STUDENTS,
    })  
  }
}
