import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../login/Login';
import CreateQuizItem from '../quiz/CreateQuizItem';
import Drawer from '../containers/Drawer';
import * as quizActions from './actions';
import Header from '../login/Header';
import { Button, Glyphicon } from 'react-bootstrap';
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
        <h3>Quiz Title:
          <input placeholder="" type="text" ref="title"></input>
          <Button onClick={this.handleSubmission} bsStyle="primary">Upload Quiz</Button>
        </h3>
        
        {this.renderQuizItems()}
        <Button onClick={this.handleClick} className="btn-warning btn-circle btn-xl">
          <Glyphicon glyph="glyphicon glyphicon-plus" />
        </Button>
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