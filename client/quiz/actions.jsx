import axios from 'axios';
import _ from 'underscore';
import { EDIT_QUIZ, START_QUIZ, ALL_QUIZZES, ANSWER_QUESTION, ADD_QUIZFORM, QUIZ_SUBMISSION, QUIZ_FETCH, UPDATE_QUIZ } from './constants';

export function submitQuiz (quizTitle,quizData) {
  var data= {title: quizTitle, questions: quizData};
  console.log('action creator',data);
  
  return axios.post('/save', {quiz: data, update:false}).then(function(response){
    console.log('response from API',response);
    if (response.status === 201){
      return {
        type: QUIZ_SUBMISSION, 
        form: quizData, 
        title: quizTitle
      };
    }
  })
  .catch(function(error){
      console.log('error',error);
      return {
        type: 'ERROR_MESSAGE',
        payload: error,
      }
  });
}

export function getQuizzes (){
  return axios.get('/fetch', {params: {title: 'manifest'}})
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

export function startQuiz (quiz) {
    console.log(quiz);
    return {
      type: START_QUIZ,
      storedQuizzes: quiz,
    }
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

export function editQuiz (quizName) {

  return axios.get('/fetch', {params: {file: quizName}})
  .then(function(response){
    var downloadedQuiz = response.data;
    return {
      type: EDIT_QUIZ,
      quiz: downloadedQuiz,
    }
  })
  .catch(function(response){
    console.log('fetch error',response);
    return {
      type: EDIT_QUIZ,
      quiz: downloadedQuiz,
    }
  })

 return {
  
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
