import React, { Component } from 'react';

import BarChart from './barChart';
import PieChart from './pieChart';
import SingleQuestionsSummary from '../components/singleQuestionsSummary';
import { Row, Col } from 'react-bootstrap';
require('../../../stylesheets/analytics.scss');

export default class ClassQuizSummary extends Component {

  constructor(props) {
    super(props);
  };

  renderQuizResults() {

    return this.props.data.analyzedQuizes.map((quizResult) => {

      let datapack = {
        title: quizResult.title, 
        labels: quizResult.uniqueScores, 
        data: quizResult.scoreData 
      };

      return (
        <div key={quizResult.title}  >
          <div className="row" >
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
          <div>
            <SingleQuestionsSummary data={quizResult}/>
          </div>

        </div>
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