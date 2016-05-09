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






    return Object.assign({}, state, {
      results: 'hi five'
    });

  default
    return state;

  };

};


