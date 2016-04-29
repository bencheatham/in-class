import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Login from '../login/Login'
import Video from '../video/Video'
import Drawer from '../containers/Drawer'

class QuizForm extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit () {
    console.log(this.refs.title.value);
  }

  render() {
   return (
     <div>
      Question: <input ref="title" type="text"></input>
      Choice 1: <input ref="choice-1" type="text"></input>
      Choice 2: <input ref="choice-2" type="text"></input>
      Choice 3: <input ref="choice-3" type="text"></input>
      Choice 4: <input ref="choice-4" type="text"></input>
      <button onClick={this.handleSubmit}>Submit</button>
    </div>
   );
  };
}

export default QuizForm;

var quiz = [
  {
    question: "What color is the blowfish",
    options: ['red','blue','green','orange'],
    answer: 2,
  },
  {
    question: "What color is the blowfish",
    options: ['red','blue','green','orange'],
    answer: 2,
  }
];

