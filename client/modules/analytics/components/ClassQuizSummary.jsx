import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import BarChart from './barChart';
import PieChart from './pieChart';
import SingleQuestionsSummary from '../components/singleQuestionsSummary';
require('../../../stylesheets/analytics.scss');

export default class ClassQuizSummary extends Component {

  constructor(props) {
    super(props);
    this.openAnalytics = this.openAnalytics.bind(this);

  };

  openAnalytics(idx) {
    this.props.data.analyticsActions.selectQuiz(idx);
   // hashHistory.push('/analytics/quiz');
  };

  renderQuizResults() {



    return this.props.data.analyzedQuizes.map((quizResult, idx) => {

      console.log(quizResult)

      let datapack = {
        title: quizResult.title, 
        labels: quizResult.uniqueScores, 
        data: quizResult.scoreData 
      };

      return (
        <li key={idx} className="list-group-item quiz-graph-li" onClick={this.openAnalytics.bind(this, idx)}>
          <div>

            <div>
              <div className="quiz-graph quiz-list-title">
                <h2>myQuiz</h2>
              </div>
              <div className="quiz-graph quiz-graph-pie" >
                <PieChart data={datapack} />
              </div>
              <div className="quiz-graph" >
                <BarChart data={datapack}  />
              </div>
              <div className="quiz-graph" >
                <ul className="list-group  ">
                <li className="list-group-item quiz-graph-li " ><strong>Class Average: </strong>{quizResult.classAverage}%</li>
                <li className="list-group-item quiz-graph-li "><strong>Standard Deviation: </strong>{quizResult.stdDev}%</li>
                <li className="list-group-item quiz-graph-li "><strong>Number of Students: </strong>{quizResult.numStudents}</li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      );
    });
  };



  render() {

    return (

      <div>
      {this.renderQuizResults()}
      </div> 

    );
  };
}