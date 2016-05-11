import { ANALYZE_QUIZ_RESULTS, FETCH_QUIZ_LIST, SELECT_QUIZ } from '../constants/analytics_constants';
import _ from 'lodash';
import analyzeQuiz from './analyzeQuiz';

let initState = {
  analyzedQuizes: [],
  availableQuizes: [],
  selectedQuiz: null
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

    case FETCH_QUIZ_LIST:

      return Object.assign({}, state, {
        availableQuizes: action.quizList
    });

    case SELECT_QUIZ:

      return Object.assign({}, state, {
        selectedQuiz: action.payload
    });


  default:
    return state;

  };

};


