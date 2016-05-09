import axios from 'axios';
import _ from 'underscore';
import * as type from './constants';

export function submitQuiz (quizTitle,quizData) {
  var data= {title: quizTitle, questions: quizData};
    
  return axios.post('/save', {quiz: data, update:false}).then(function(response){
    console.log('response from API',response);
    if (response.status === 201){
      return {
        type: type.QUIZ_SUBMISSION, 
        form: quizData, 
        title: quizTitle
      };
    }
  })
  .catch(function(error){
      console.log('error',error);
      return {
        type: type.ERROR_MESSAGE,
        payload: error,
      }
  });
}

export function getQuizzes (){
  return axios.get('/fetch', {params: {title: 'manifest'}})
  .then(function(response){
    console.log('response from API',response);
      return {
        type: type.ALL_QUIZZES,
        quizzes: response.data
      };
    
  })
  .catch(function(response){
      console.log('error',response);
      return {
        type: type.ALL_QUIZZES,
      }
  });
}

export function storePopQuiz(quiz) {
    return {
      type: type.STORE_QUIZ,
      quiz: quiz,
    }
}

export function addQuizForm () {
  return {
    type: type.ADD_QUIZFORM,
  }
}

export function updateQuiz (formData) {

 return {
  type: type.UPDATE_QUIZ,
  formData: formData,
 }
}

export function editQuiz (quizName) {

  return axios.get('/fetch', {params: {file: quizName}})
  .then(function(response){
    var downloadedQuiz = response.data;
    return {
      type: type.EDIT_QUIZ,
      quiz: downloadedQuiz,
    }
  })
  .catch(function(response){
    console.log('fetch error',response);
    return {
      type: type.EDIT_QUIZ,
      quiz: downloadedQuiz,
    }
  })

 return {};
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
    console.log('answers',answers);
    
    if (lastQuestion){
      dispatch ({
          type: type.END_QUIZ,
      });

      postAnswers(quizTitle,teachername,answers)

    }
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
        type: type.DISPLAY_RESULTS,
        payload: response.data
      };
    
  })
  .catch(function(response){
      console.log('error',response);
      return {
        type: type.DISPLAY_RESULTS,
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
  console.log(answers)
  
  var data = {
    title: quizTitle,
    teachername: teachername, 
    answers: answers
  };

  console.log('posting answers',data)
  return axios.post('/save', {answers: data}).then(function(response){
    console.log(response)
    if (response.status === 201){
      return {};
    }
  })
  .catch(function(response){
      console.log('error',response);
      return {}
  });
}
