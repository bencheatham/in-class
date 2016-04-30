import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import _ from 'underscore'
import Login from '../login/Login'
import Video from '../video/Video'
import Drawer from '../containers/Drawer'
import { submitQuiz, updateQuiz } from './actions'


class QuizForm extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    console.log(e);
    var form = {
      title: this.refs.title.value,
      answer: this.refs.answer.value,
      choice1: this.refs.choice1.value,
      choice2: this.refs.choice2.value,
      choice3: this.refs.choice3.value,
      id: this.props.id
    }

    this.props.actions.updateQuiz(form);
  }

  render() {
    // console.log(this.props.id);
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
    quiz: state.quiz,
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({ submitQuiz, updateQuiz },dispatch),
  }
  
  
}
export default connect(mapStateToProps,mapDispatchToProps)(QuizForm);
