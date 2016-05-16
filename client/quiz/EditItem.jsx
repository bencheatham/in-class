import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import _ from 'underscore'
import Login from '../login/Login'
import Video from '../video/Video'
import Drawer from '../containers/Drawer'
import * as quizActions from './actions'
import Header from '../login/Header';


class EditItem extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.displayTitle = this.displayTitle.bind(this);
  }

  handleChange (e) {
    
    var form = {
      index: this.props.index,
      question: this.refs.title.value,
      choices: [this.refs.answer.value, this.refs.choice1.value,this.refs.choice2.value,this.refs.choice3.value],
      answer: this.refs.answer.value,
    }

   this.props.quizActions.updateEditQuiz(form);
  }

  displayTitle (){
    return this.props.quizzes[this.props.index].question;
  }

  render() {
   return (
     <tr>
     <td><input type="text" placeholder="Enter your question" onChange={this.handleChange} ref="title" value={this.props.quizData.question}></input></td>
      <td><input onChange={this.handleChange} placeholder="Answer" ref="answer" type="text" value={this.props.quizData.choices[0]}></input></td>
      <td><input onChange={this.handleChange} placeholder="Option 1" ref="choice1" type="text" value={this.props.quizData.choices[1]} ></input></td>
      <td><input onChange={this.handleChange} placeholder="Option 2" ref="choice2" type="text" value={this.props.quizData.choices[2]}></input></td>
      <td><input onChange={this.handleChange} placeholder="Option 3" ref="choice3" type="text" value={this.props.quizData.choices[3]}></input></td>
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
export default connect(mapStateToProps,mapDispatchToProps)(EditItem);
