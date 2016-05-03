import axios from 'axios';
import _ from 'underscore';
import { START_QUIZ, ALL_QUIZZES, ANSWER_QUESTION, ADD_QUIZFORM, QUIZ_SUBMISSION, QUIZ_FETCH, UPDATE_QUIZ } from './constants';

export function submitQuiz (quizTitle,formData) {
  
  return axios.post('/save', {file:quizTitle, data: formData}).then(function(response){
    console.log('response from API',response);
    if (response.status === 201){
      return {
        type: QUIZ_SUBMISSION, 
        form: formData, 
        title: quizTitle
      };
    }
  })
  .catch(function(response){
      console.log('error',response);
      return {
        type: QUIZ_SUBMISSION, 
        form: formData, 
        title: quizTitle
      }
  });
}

export function getQuizzes (){
  return axios.get('/fetch', {params: {file: 'manifest'}})
  .then(function(response){
    console.log('response from API',response);
      return {
        type: ALL_QUIZZES,
        quizzes: response.data
      };
    
  })
  .catch(function(response){
      console.log('error',response);
      return {
        type: ALL_QUIZZES,
      }
  });
}

export function storePopQuiz (data){
  // student fetches list of all his or her quizzes
  console.log('data')
  return {
    type: QUIZ_FETCH,
    quiz: data,
  }
}

export function startQuiz (quizName) {
  
  return axios.get('/fetch', {params: {file: quizName}})
  .then(function(response){
    var downloadedQuizzes = response.data;
    return {
      type: START_QUIZ,
      storedQuizzes: downloadedQuizzes,
    }
  })
  .catch(function(response){
    console.log('fetch error',response);
    return {
      type: START_QUIZ,
      storedQuizzes: downloadedQuizzes,
    }
  })
}

export function addQuizForm () {
  return {
    type: ADD_QUIZFORM,
  }
}

export function updateQuiz (formData) {

 return {
  type: UPDATE_QUIZ,
  formData: formData,
 }
}

export function answerQuestion (answer,lastQuestion) {
  if (lastQuestion){
    //postAnswers
  }

  return {
    type: ANSWER_QUESTION,
    answer: answer
  }
}

export function postAnswers(){
  //   return axios.post('/save', {file:quizTitle, data: formData}).then(function(response){
    
  //   if (response.status === 201){
  //     return {
  //       type: QUIZ_SUBMISSION, 
  //       form: formData, 
  //       title: quizTitle
  //     };
  //   }
  // })
  // .catch(function(response){
  //     console.log('error',response);
  //     return {
  //       type: QUIZ_SUBMISSION, 
  //       form: formData, 
  //       title: quizTitle
  //     }
  // });
  console.log('api save answers')
}
