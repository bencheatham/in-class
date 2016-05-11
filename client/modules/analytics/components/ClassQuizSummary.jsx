import React, { Component } from 'react';

import BarChart from './BarChart';
import PieChart from './PieChart';


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
        <div key={quizResult.title}>

          <BarChart data={datapack} />
          <PieChart data={datapack} />

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