import {reduce, each} from 'lodash';
import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import { Button, Glyphicon } from 'react-bootstrap';



export default class ListQuizes extends Component {
  constructor(props){
    super(props);
    this.openAnalytics = this.openAnalytics.bind(this);
    this.getQuizList = this.getQuizList.bind(this);

  };

  openAnalytics(idx) {
    console.log('about to call action')
    console.log(idx)
   // this.props.data.analyticsActions.selectQuiz(idx);
     this.props.data.analyticsActions.getQuizAndAnalyze(idx);

  };

  getQuizList() {
    let quizes = this.props.data.availableQuizes;
    if (!quizes || quizes.length === 0) {
      return (<div>No Quizes Have been Taken Yet...</div>);
    }

    return quizes.map((quiz, idx) => {
      return (
        <li key={idx} className="list-group-item" onClick={this.openAnalytics.bind(this, idx)}>
          <span className="userIcon"><Glyphicon glyph="glyphicon glyphicon-signal" /></span>
          <span className="quizId"> {quiz}</span>
        </li>
      );
    });
  };

  render() {

    return (
     <div>
       <h3>Select Below Quizes for Results</h3>
       <ul>{this.getQuizList()}</ul>
     </div>

    );
  };

};

