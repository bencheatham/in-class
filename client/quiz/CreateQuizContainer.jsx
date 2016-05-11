import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../login/Login';
import CreateQuizItem from '../quiz/CreateQuizItem';
import Drawer from '../containers/Drawer';
import * as quizActions from './actions';
import Header from '../login/Header';

class CreateQuizContainer extends Component {
  constructor (props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
    this.renderQuizItems = this.renderQuizItems.bind(this);
  }

  handleClick (){
    this.props.quizActions.addQuizForm();
  }

  handleSubmission (){
    this.props.quizActions.saveQuizInDatabase(this.refs.title.value,this.props.quiz.quizzes,false);
  }

  renderQuizItems(){
    var quizForms = [];
    for (var i = 0; i < this.props.quiz.questionForms; i++){
      quizForms.push(<CreateQuizItem handleSubmission={this.handleSubmission} key={i} index={i} />);
    }
    return quizForms;
  }

  render() {
    return (
      <div>
        <Header />
        <span><h1>Create a new quiz.</h1></span>
        <span>Quiz title:</span>
        <input type="text" ref="title"></input>
        <button onClick={this.handleSubmission}> Create Quiz</button>
        {this.renderQuizItems()}
        <div onClick={this.handleClick}>[ + + + + +]</div>
      </div>
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
    quizActions: bindActionCreators(quizActions,dispatch)  
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateQuizContainer);