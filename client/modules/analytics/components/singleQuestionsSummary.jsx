import React, { Component } from 'react';
import BarChart from './barChart';
import PieChart from './pieChart';
import _ from 'lodash';


export default class SingleQuestionsSummary extends Component {

  constructor(props) {
    super(props);
  };


  renderQuizQuestionResults() {

    let idx = this.props.data.selectedQuiz;

    let quizResult = idx === null? this.props.data : this.props.data.analyzedQuizes[idx];

      return (
        <div key={quizResult.title} >

          {this.renderQuestion(quizResult.answerTally.questions)}

        </div>
      );
  };

  renderQuestion(questions) {

   return  _.map(questions, (question, key) => {

      let datapack = {
        title: key, 
        labels: question.labels, 
        data: question.responseData 
      };

      console.log(key)

      return (
        <div key={key} className="quiz-graph">
          <BarChart data={datapack} questions={true} />

        </div>

      );
   });

  }


  render() {
    // if(this.props.analyzedQuizes === null || this.props.analyzedQuizes === undefined) {
    //   return (
    //     <div>Loading...</div>
    //   );
    // }

    return (

      <div className="quiz-graph quiz-graph-questions">
        {this.renderQuizQuestionResults()}
      </div> 

    );
  };

}