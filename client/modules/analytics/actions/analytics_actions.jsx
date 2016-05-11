import * as types from '../constants/analytics_constants';
import axios from 'axios';



export function getQuizAnalytics () {
  let quizContainer = [];

  let p1 = (quiz, obj) => axios.get('/fetch', {params: {title: quiz}})
                .then((response) => {
                  obj.quizTitle = quiz;
                  obj.quizDetails = response.data;
                });
  let p2 = (quiz, obj) => axios.get('/fetch', {params: {title: quiz, answers: true}})
                .then((response) => {
                  obj.studentAnswers = response.data;
                });

  let fetchQuizData = (quizes, data) => {

    if(quizes.length > 0) {
      let quiz = quizes.shift();
      let obj = {};

      return Promise.all([p1(quiz, obj), p2(quiz, obj)]).then(() => {
        quizContainer.push(obj);
        return fetchQuizData(quizes);
      });

    } else {

      return {
        type: types.ANALYZE_QUIZ_RESULTS,
        payload: quizContainer
      };

    }
  };


  return axios.get('/fetch', {params: {title: 'manifest'}})
  .then(function(response){

    let quizes = response.data.slice();

    return fetchQuizData(quizes);

   });

}




