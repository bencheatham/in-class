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




           // let results = analyzeQuiz(quiz, responses);
      //count number of questions.

      //for each student
        //for each question, did student answer correct?  y/n


      //WHAT DO I CARE ABOUT??
      //for each question
        //how many students answered each answer
        //how many students answered correctly



      //output 3 graphs
        //for each question, graph showing distribution of student responses
        //for each quiz, output of # students within each percentage ranges
        //output showing each student overall score as a bar
          //teacher only

/*Results Object Looks like this:

{ questions: 
   { 'What is your favorite color?': { responses: [Object] },
     'What is your favorite sport?': { responses: [Object] },
     'What is your favorite drink?': { responses: [Object] } } }
{ studentTotals: 
   [ { right: 1, wrong: 2, studentname: 'student1', percentage: 33 },
     { right: 2, wrong: 1, studentname: 'student2', percentage: 67 },
     { right: 1, wrong: 2, studentname: 'student3', percentage: 33 },
     { right: 2, wrong: 1, studentname: 'student4', percentage: 67 },
     { right: 0, wrong: 3, studentname: 'student5', percentage: 0 } ],
  uniqueScoresObj: { '0': 1, '33': 2, '67': 2, '100': 0 },
  classPercentageAccum: 200,
  classAverage: 40,
  questionTally: {},
  answerTally: 
   { questions: 
      { 'What is your favorite color?': [Object],
        'What is your favorite sport?': [Object],
        'What is your favorite drink?': [Object] } },
  uniqueScores: [ '0', '33', '67', '100' ],
  scoreData: [ 1, 2, 2, 0 ],
  diffSquaredSum: 3156,
  variance: 631,
  stdDev: 25,
  numStudents: 5,
  classAvg: 40 }


//result.answerTally.questions, object with following props:

{ 'What is your favorite color?': 
   { responses: { red: 2, blue: 1, yellow: 1, purple: 1 },
     labels: [ 'red', 'blue', 'yellow', 'purple' ],
     responseData: [ 2, 1, 1, 1 ] },
  'What is your favorite sport?': 
   { responses: { basketball: 0, football: 2, baseball: 2, golf: 1 },
     labels: [ 'basketball', 'football', 'baseball', 'golf' ],
     responseData: [ 0, 2, 2, 1 ] },
  'What is your favorite drink?': 
   { responses: { water: 2, coffee: 1, beer: 1, wine: 1 },
     labels: [ 'water', 'coffee', 'beer', 'wine' ],
     responseData: [ 2, 1, 1, 1 ] } }

*/







      let newData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      }

 

          // var quiz = {"title":"myQuiz",
          //     "questions": 
          //     [
          //      { 
          //       "index": 0,
          //       "question":
          //       "What is your favorite color?",
          //       "choices": ["red","blue","yellow","purple"],
          //       "answer":"red"},
                
          //      {
          //       "index": 1,
          //       "question": "What is your favorite sport?",
          //       "choices": ["basketball","football","baseball","golf"],
          //       "answer":"baseball"},

          //       {
          //       "index": 2,
          //       "question": "What is your favorite drink?",
          //       "choices": ["water","coffee","beer","wine"],
          //       "answer": "water"}
          //     ]
          //   }


          // var responses = {
          //     "title":"myQuiz",
          //     "answers": [{"answers":
          //                 [ {"val":"blue","index":"0"},
          //                   {"val":"golf","index":"1"},
          //                   {"val":"water","index":"2"}
          //                 ],
          //                 "studentname":"student1"},
          //                 {"answers":
          //                   [ {"val":"red","index":"0"},
          //                     {"val":"baseball","index":"1"},
          //                     {"val":"coffee","index":"2"}
          //                   ],
          //                 "studentname":"student2"},
          //                 {"answers":
          //                   [ {"val":"red","index":"0"},
          //                     {"val":"football","index":"1"},
          //                     {"val":"beer","index":"2"}
          //                   ],
          //                 "studentname":"student3"},
          //                 {"answers":
          //                   [ {"val":"yellow","index":"0"},
          //                     {"val":"baseball","index":"1"},
          //                     {"val":"water","index":"2"}
          //                   ],
          //                 "studentname":"student4"},
          //                 {"answers":
          //                   [ {"val":"purple","index":"0"},
          //                     {"val":"football","index":"1"},
          //                     {"val":"wine","index":"2"}
          //                   ],
          //                 "studentname":"student5"}
          //                 ]
          //   }





    return Object.assign({}, state, {
      analyzedQuizes: analyzedQuizes
    });

  default:
    return state;

  };

};


