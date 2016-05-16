import React, { Component } from 'react';

import BarChart from './barChart';
import PieChart from './pieChart';


export default class SingleQuizSummary extends Component {

  constructor(props) {
    super(props);
  };

  renderQuizResults() {

    let idx = this.props.data.selectedQuiz;

    let quizResult = this.props.data.analyzedQuizes[idx];

    let datapack = {
      title: quizResult.title, 
      labels: quizResult.uniqueScores, 
      data: quizResult.scoreData 
    };

    return (
      <div>
      <div key={quizResult.title} >
          <div>
            <div className="single-quiz-graph-title">
              <h2>{quizResult.title} Results</h2>
            </div>
            <div>
              <div className="quiz-graph quiz-graph-pie" >
                <PieChart data={datapack} />
              </div>
              <div className="quiz-graph" >
                <BarChart data={datapack} questions={false}  />
              </div>
              <div className="quiz-graph" >
                <ul className="list-group  ">
                  <li className="list-group-item quiz-graph-summary-li" ><strong>Class Average: </strong>{quizResult.classAverage}%</li>
                  <li className="list-group-item quiz-graph-summary-li"><strong>Standard Deviation: </strong>{quizResult.stdDev}%</li>
                  <li className="list-group-item quiz-graph-summary-li"><strong>Number of Students: </strong>{quizResult.numStudents}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };



  render() {

    return (


      <div>
        {this.renderQuizResults()}
      </div> 

    );
  };
}