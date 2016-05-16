import * as types from '../constants/analytics_constants';
import axios from 'axios';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import { returnStore } from '../../../main';


export function getQuizAndAnalyze(quizData){

  return function(dispatch, getState){
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

          if(quizes.length > 0) {
            let quiz = quizes.shift();
            let obj = {};

            return Promise.all([p1(quiz, obj), p2(quiz, obj)]).then(() => {
              quizContainer.push(obj);
              return fetchQuizData(quizes);
            });

          } else {

            dispatch({
              type: types.ANALYZE_QUIZ_RESULTS,
              payload: quizContainer
            });

            if(quizData !== undefined){

              dispatch({
                type: types.SELECT_QUIZ,
                payload: quizData
              });

              hashHistory.push('/analytics/quiz');
            } else {

              hashHistory.push('/analytics');
            
            }
          }
      };

      fetchQuizData();

      });
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




