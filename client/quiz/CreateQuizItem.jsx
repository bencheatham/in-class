import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import _ from 'underscore'
import Login from '../login/Login'
import Video from '../video/Video'
import Drawer from '../containers/Drawer'
import * as quizActions from './actions'
import Header from '../login/Header';

class CreateQuizItem extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);    
  }

  handleChange (e) {
    
    var form = {
      index: this.props.index,
      question: this.refs.title.value,
      choices: [this.refs.answer.value, this.refs.choice1.value,this.refs.choice2.value,this.refs.choice3.value],
      answer: this.refs.answer.value,
    }

    this.props.quizActions.updateQuestionData(form);
  }
 
  render() {

   return (
     <tr>
      <td><input type="text" placeholder="Enter your question" onChange={this.handleChange} ref="title"></input></td>
      <td><input onChange={this.handleChange} placeholder="Answer" ref="answer" type="text"></input></td>
      <td><input onChange={this.handleChange} placeholder="Option" ref="choice1" type="text"></input></td>
      <td><input onChange={this.handleChange} placeholder="Option" ref="choice2" type="text"></input></td>
      <td><input onChange={this.handleChange} placeholder="Option" ref="choice3" type="text"></input></td>
    </tr>
   );
  };
}

function mapStateToProps(state){
  return {
    user: state.user,
    quiz: state.teacherQuiz,
    quizzes: state.teacherQuiz.quizzes,
  }
}

function mapDispatchToProps(dispatch){
  return {
    quizActions: bindActionCreators(quizActions,dispatch),
  }
  
  
}
export default connect(mapStateToProps,mapDispatchToProps)(CreateQuizItem);
