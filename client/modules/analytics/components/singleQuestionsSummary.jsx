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
    let quizResult = this.props.data.analyzedQuizes[idx];

    return (
      <div key={quizResult.title}>
        <h2>{quizResult.title}</h2>
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

      return (
        <div key={key}>
          <BarChart data={datapack} />

        </div>

      );
   });

  }


  render() {

    return (

      <div>
      {this.renderQuizQuestionResults()}
      </div>

    );
  };

}
