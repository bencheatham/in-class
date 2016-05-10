import { UPDATE_QUIZ_RESULTS } from '../constants/analytics_constants';
import _ from 'lodash';


let initState = {
  results: []
};





export default function(state = initState, action) {
  switch(action.type) {
    case UPDATE_QUIZ_RESULTS:

      //count number of questions.

      //for each student
        //for each question, did student answer correct?  y/n

      //student name results
      let results = {
        student: {
          name:

        }
      }
      //WHAT DO I CARE ABOUT??
      //for each question
        //how many students answered each answer
        //how many students answered correctly



      //output 3 graphs
        //for each question, graph showing distribution of student responses
        //for each quiz, output of # students within each percentage ranges
        //output showing each student overall score as a bar
          //teacher only




      let questionResponses = _.reduce(obj, (accum, item) => {
        
          if(accum[answer] === undefined){
            accum[answer] = 1;
          } else {
            accum[answer] += 1;
          }
          return accum;
        }, {})


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

  {"title":"myQuiz",
    "questions": 
    [{ 
      "index": 0,
      "question":
      "What is your favorite color?",
      "choices": ["red","blue","yellow","purple"],
      "answer":"red"},
      
     {
      "index": 1,
      "question": "What is your favorite sport?",
      "choices": ["basketball","football","baseball","golf"],
      "answer":"baseball"},

      {
      "index": 2,
      "question": "What is your favorite drink?",
      "choices": ["water","coffee","beer","wine"],
      "answer": "water"}
    ]
  }


  {
    "title":"myQuiz",
    "answers": [{"answers":
                [ {"val":"blue","index":"0"},
                  {"val":"golf","index":"1"},
                  {"val":"water","index":"2"}
                ],
                "studentname":"student1"},
                {"answers":
                  [ {"val":"red","index":"0"},
                    {"val":"baseball","index":"1"},
                    {"val":"coffee","index":"2"}
                  ],
                "studentname":"student2"},
                {"answers":
                  [ {"val":"red","index":"0"},
                    {"val":"football","index":"1"},
                    {"val":"beer","index":"2"}
                  ],
                "studentname":"student3"},
                {"answers":
                  [ {"val":"yellow","index":"0"},
                    {"val":"baseball","index":"1"},
                    {"val":"water","index":"2"}
                  ],
                "studentname":"student4"},
                {"answers":
                  [ {"val":"purple","index":"0"},
                    {"val":"football","index":"1"},
                    {"val":"wine","index":"2"}
                  ],
                "studentname":"student5"}
                ]
  }


  //calculate student responses

var f = function(val){console.log(val)}

var quiz = {"title":"myQuiz",
    "questions": 
    [
     { 
      "index": 0,
      "question":
      "What is your favorite color?",
      "choices": ["red","blue","yellow","purple"],
      "answer":"red"},
      
     {
      "index": 1,
      "question": "What is your favorite sport?",
      "choices": ["basketball","football","baseball","golf"],
      "answer":"baseball"},

      {
      "index": 2,
      "question": "What is your favorite drink?",
      "choices": ["water","coffee","beer","wine"],
      "answer": "water"}
    ]
  }


var responses = {
    "title":"myQuiz",
    "answers": [{"answers":
                [ {"val":"blue","index":"0"},
                  {"val":"golf","index":"1"},
                  {"val":"water","index":"2"}
                ],
                "studentname":"student1"},
                {"answers":
                  [ {"val":"red","index":"0"},
                    {"val":"baseball","index":"1"},
                    {"val":"coffee","index":"2"}
                  ],
                "studentname":"student2"},
                {"answers":
                  [ {"val":"red","index":"0"},
                    {"val":"football","index":"1"},
                    {"val":"beer","index":"2"}
                  ],
                "studentname":"student3"},
                {"answers":
                  [ {"val":"yellow","index":"0"},
                    {"val":"baseball","index":"1"},
                    {"val":"water","index":"2"}
                  ],
                "studentname":"student4"},
                {"answers":
                  [ {"val":"purple","index":"0"},
                    {"val":"football","index":"1"},
                    {"val":"wine","index":"2"}
                  ],
                "studentname":"student5"}
                ]
  }
  
  

let checkQuizIndexes = () => {  
  return quiz.questions.reduce((accum, item, idx) => {
      if(item.index !== idx) { 
        return accum = false 
      } else {
        return accum;
      }
    }, true); 
}


let initStudentData = {
  studentTotals: [],
  uniqueScoresObj: {},
  classPercentageAccum: 0,
  classAverage: 0
}


let classScores = responses.answers.reduce((accum1, item, idx) => {

  currentStud = item.studentname;
  
  let one = item.answers.reduce((accum2, answer) => {
    accum2.studentname = currentStud;
    if(answer.val === quiz.questions[answer.index].answer) {
      accum2.right += 1;
    } else {
        accum2.wrong += 1;
    }
    return accum2;
  }, {right: 0, wrong: 0})
  

  accum1.studentTotals[idx] = one
  let percentage = Math.round(one.right / (one.right + one.wrong) * 100, 2);
  accum1.studentTotals[idx].percentage = percentage;
  
  if(accum1.uniqueScoresObj[percentage] === undefined){
    accum1.uniqueScoresObj[percentage] = 1;
  } else {
    accum1.uniqueScoresObj[percentage] += 1;  
  }
  if(accum1.uniqueScoresObj[100] === undefined){
    accum1.uniqueScoresObj[100] = 0;
  }
    if(accum1.uniqueScoresObj[0] === undefined){
    accum1.uniqueScoresObj[0] = 0;
  }
  
  accum1.classPercentageAccum += percentage;
  accum1.classAverage = Math.round(accum1.classPercentageAccum / accum1.studentTotals.length, 2);

  return accum1

}, initStudentData);


let uniqueScores = [];
let scoreData = [];
for (var key in classScores.uniqueScoresObj) {
  uniqueScores.push(key);
  scoreData.push(classScores.uniqueScoresObj[key]);
}

classScores.uniqueScores = uniqueScores;
classScores.scoreData = scoreData;


let stdDeviationStart = {
  diffSquaredSum: 0,
  variance: 0,
  stdDev: 0,
  numStudents: classScores.studentTotals.length,
  classAvg: classScores.classAverage
}

let addOns = classScores.studentTotals.reduce((accum, answer) => {
  
  accum.diffSquaredSum += Math.pow((answer.percentage - accum.classAvg), 2);
  accum.variance = Math.round(accum.diffSquaredSum / accum.numStudents)
  accum.stdDev = Math.round(Math.sqrt(accum.variance))
  return accum;
  
}, stdDeviationStart)

for(var key in addOns) {
  classScores[key] = addOns[key];
}




f(classScores)





//for each question
  //put possible answers in object
  //










    return Object.assign({}, state, {
      results: 'hi five'
    });

  default
    return state;

  };

};


