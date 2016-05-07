import axios from 'axios';
import _ from 'underscore';
import * as type from './constants';

export function submitQuiz (quizTitle,quizData) {
  var data= {title: quizTitle, questions: quizData};
  console.log('action creator',data);
  
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

export function storePopQuiz (data){
  // student fetches list of all his or her quizzes
  console.log('data')
  return {
    type: type.QUIZ_FETCH,
    quiz: data,
  }
}

export function storePopQuiz(quiz) {
    console.log(quiz);
    return {
      type: type.START_QUIZ,
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

 return {
  
 }
}

export function answerQuestion (answer,lastQuestion) {
  if (lastQuestion){
    //postAnswers
  }

  return {
    type: type.ANSWER_QUESTION,
    answer: answer
  }
}

export function openQuizModal(){
  return {
    type: type.OPEN_MODAL, 
  }
}

export function closeQuizModal(){
  return {
    type: type.CLOSE_MODAL, 
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
