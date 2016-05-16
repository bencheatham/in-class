import * as types from '../constants/analytics_constants';
import axios from 'axios';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import { returnStore } from '../../../main';


export function getQuizAndAnalyze(quizData){

  return function(dispatch, getState){
    console.log('hhhhhh')
     axios.get('/fetch', {params: {title: 'manifest'}})
      .then(function(response){


        let quizContainer = [];
        let quizes = response.data.slice();


        let p1 = (quiz, obj) => axios.get('/fetch', {params: {title: quiz}})
              .then((response) => {
                obj.quizTitle = quiz;
                obj.quizDetails = response.data;
              });
        let p2 = (quiz, obj) => axios.get('/fetch', {params: {title: quiz, answers: true}})
              .then((response) => {
                obj.studentAnswers = response.data;
              });
        function fetchQuizData() {
          console.log('in fetch quizData')


          if(quizes.length > 0) {
            let quiz = quizes.shift();
            let obj = {};

            return Promise.all([p1(quiz, obj), p2(quiz, obj)]).then(() => {
              quizContainer.push(obj);
              return fetchQuizData(quizes);
            });

          } else {
            console.log('in actions with fullfilled promise')


            dispatch({
              type: types.ANALYZE_QUIZ_RESULTS,
              payload: quizContainer
            });

            if(quizData !== undefined){

              console.log('yes!')
              console.log(quizData)

              dispatch({
                type: types.SELECT_QUIZ,
                payload: quizData
              });

              hashHistory.push('/analytics/quiz');
            } else {
              console.log('did not make it')
              hashHistory.push('/analytics');
            }
          }
      };



      fetchQuizData();

      });


  };
};


export function getQuizAnalytics (quizData) {

  console.log('in the action')

  

  return function(dispatch, getState) {





//     axios.get('/fetch', {params: {title: 'manifest'}})
//       .then(function(response){
//         let quizContainer = [];

//         let p1 = (quiz, obj) => axios.get('/fetch', {params: {title: quiz}})
//               .then((response) => {
//                 obj.quizTitle = quiz;
//                 obj.quizDetails = response.data;
//               });
//         let p2 = (quiz, obj) => axios.get('/fetch', {params: {title: quiz, answers: true}})
//               .then((response) => {
//                 obj.studentAnswers = response.data;
//               });

//         function fetchQuizData() {
//           console.log('in fetch quizData')

//           let quizes = response.data.slice();

//           if(quizes.length > 0) {
//             let quiz = quizes.shift();
//             let obj = {};

//             return Promise.all([p1(quiz, obj), p2(quiz, obj)]).then(() => {
//               quizContainer.push(obj);
//               return fetchQuizData(quizes);
//             });

//           } else {
//             console.log('in actions with fullfilled promise')


//             dispatch({
//               type: types.ANALYZE_QUIZ_RESULTS,
//               payload: quizContainer
//             });

//             if(quizData){

//               dispatch({
//                 type: types.SELECT_QUIZ,
//                 payload: quizData
//               });

//               hashHistory.push('/analytics/quiz');
//             }
            
//            hashHistory.push('/analytics');
//           }
//       };


//      //   
// //    };
//     });
  };
};



export function fetchQuizList (){
  return axios.get('/fetch', {params: {title: 'manifest'}})
  .then(function(response){
      return {
        type: types.FETCH_QUIZ_LIST,
        quizList: response.data
      };    
  })
  .catch(function(response){
      console.log('error',response);
      return {}
  });
}

export function selectQuiz (quiz){

  console.log('in select quiz')
   
  getQuizAnalytics(quiz);    
    // return {
    //   type: types.SELECT_QUIZ,
    //   payload: quiz
    // };    

}




