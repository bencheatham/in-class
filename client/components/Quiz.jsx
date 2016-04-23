import React, { PropTypes } from 'react'

export default class Quiz extends React.Component {

  accept() {
    console.log('accept')
    // record the response, and go to next question
  }

  reject() {
    console.log('reject')
    // record the response, and go to next question
  }

  render() {
    return (
      <div>
        <h4>Quiz</h4>
        <div>Q1: state needed here</div>
        <button className="btn btn-primary" onClick={this.accept}>accept</button>
        <button className="btn btn-primary" onClick={this.reject}>reject</button>
      </div>
    );
  }
}
