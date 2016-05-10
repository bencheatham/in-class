import * as types from '../constants/analytics_constants';
import axios from 'axios';



export function getQuizAnalytics (){
  return axios.get('/fetch', {params: {title: 'manifest'}})
  .then(function(response){
    console.log('response from API',response);

    let quizContainer = [];

    response.data.forEach((quiz) => {
      let obj = {};
      axios.get('/fetch', {params: {title: quiz}})
        .then(function(response){
          console.log('response from API',response);
          obj.quizTitle = quiz;
          obj.quizDetails = response.data;


          axios.get('/fetch', {params: {title: quiz, answers: true}})
            .then(function(response){
              console.log('response from API',response);
              obj.studentAnswers = response.data;
              quizContainer.push(obj);


            })
           .catch(function(response){
           });
        }) 
      .catch(function(response){
      });
    });





      return {
        type: type.ANALYZE_QUIZ_RESULTS,
        quizzes: response.data
      };
    
  })
  .catch(function(response){
      console.log('error',response);
      return {
        type: type.ANALYZE_QUIZ_RESULTS,
      }
  });
}


// export function getQuizDetails (){
//   return axios.get('/fetch', {params: {title: 'myQuiz'}})
//   .then(function(response){
//     console.log('response from API',response);
//       return {
//         type: type.ALL_QUIZZES,
//         quizzes: response.data
//       };
    
//   })
//   .catch(function(response){
//       console.log('error',response);
//       return {
//         type: type.ALL_QUIZZES,
//       }
//   });
// }


// export function fetchResults(quizName) {
//    return axios.get('/fetch', {params: {title: quizName, answers: true}})
//   .then(function(response){
//     console.log('response from API',response);
//       return {
//         type: type.DISPLAY_RESULTS,
//         payload: response.data
//       };
    
//   })
//   .catch(function(response){
//       console.log('error',response);
//       return {
//         type: type.DISPLAY_RESULTS,
//       }
//   });

//   return {
//     type: type.ANSWER_QUESTION,
//     answer: answer
//   }
// }







