import React, { Component } from 'react';

import BarChart from './BarChart';
import PieChart from './PieChart';


export default class ClassQuizSummary extends Component {

  constructor(props) {
    super(props);

  }

  renderQuizResults() {

    return this.props.data.analyzedQuizes.map((quizResult) => {

      let datapack = {
        title: quizResult.title, 
        labels: quizResult.uniqueScores, 
        data: quizResult.scoreData 
      };
      console.log(datapack)

    //       {this.props.data.analyzedQuizes[0].uniqueScores}
    // {this.props.data.analyzedQuizes[0].scoreData}

      return (
        <div key={quizResult.title}>
          <h2>{quizResult.title}</h2>

          <BarChart data={datapack} />

          <PieChart data={datapack} />

        </div>
      );

    });

  }



  render() {

    // console.log('in ClassQuizSummary')
    // console.log(this.props.data.analyzedQuizes[0].uniqueScores)
    // console.log(this.props.data.analyzedQuizes[0].scoreData)
    // console.log(this.props.data.analyzedQuizes[0].title)



    return (

      <div>
      {this.renderQuizResults()}
      </div> 

    );

  }


}