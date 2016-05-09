import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import _ from 'underscore'
import Login from '../login/Login'
import Video from '../video/Video'
import Drawer from '../containers/Drawer'
import { submitQuiz, updateQuiz } from './actions'
import Header from '../login/Header';


class CreateQuiz extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    console.log(e);
    var form = {
      index: this.props.id,
      question: this.refs.title.value,
      choices: [this.refs.answer.value, this.refs.choice1.value,this.refs.choice2.value,this.refs.choice3.value],
      answer: this.refs.answer.value,
    }

    this.props.actions.updateQuiz(form);
  }

  render() {
    var data = this.props.quiz.quizzes[this.props.id];
   return (
     <div>
      Question: <input type="text" onChange={this.handleChange} ref="title"></input>
      Answer: <input onChange={this.handleChange} ref="answer" type="text"></input>
      Choice 1: <input onChange={this.handleChange} ref="choice1" type="text"></input>
      Choice 2: <input onChange={this.handleChange} ref="choice2" type="text"></input>
      Choice 3: <input onChange={this.handleChange} ref="choice3" type="text"></input>
    </div>
   );
  };
}

function mapStateToProps(state){
  return {
    user: state.user,
    quiz: state.teacherQuiz,
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({ submitQuiz, updateQuiz },dispatch),
  }
  
  
}
export default connect(mapStateToProps,mapDispatchToProps)(CreateQuiz);
