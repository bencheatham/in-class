import { ANALYZE_QUIZ_RESULTS } from '../constants/analytics_constants';
import _ from 'lodash';
import analyzeQuiz from './analyzeQuiz';

let initState = {
  analyzedQuizes: [], 
};

export default function(state = initState, action) {

  switch(action.type) {
    case ANALYZE_QUIZ_RESULTS:

      let analyzedQuizes = action.payload.map((quiz) => {

        let quizDetails = quiz.quizDetails;
        let quizResponses = quiz.studentAnswers;

        return analyzeQuiz(quizDetails, quizResponses); 
      });


    return Object.assign({}, state, {
      analyzedQuizes: analyzedQuizes
    });

  default:
    return state;

  };

};


