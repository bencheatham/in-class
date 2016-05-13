import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import _ from 'underscore'
import Login from '../login/Login'
import Video from '../video/Video'
import Drawer from '../containers/Drawer'
import * as quizActions from './actions'
import {fetchQuiz} from './socket'
import { Button } from 'react-bootstrap';
require('../stylesheets/sidebar.scss');

class QuizItem extends Component {

  constructor(props){
    super(props);
    this.sendPopQuiz = this.sendPopQuiz.bind(this);
    this.seeResults = this.seeResults.bind(this);
    this.deleteQuiz = this.deleteQuiz.bind(this);
    this.editQuiz = this.editQuiz.bind(this);
  }

  sendPopQuiz () {
    console.log('send pop quiz')
    fetchQuiz(this.props.name, this.props.user.username);
  }
  
  editQuiz () {
    this.props.quizActions.loadQuiz(this.props.name);
  }
  seeResults () {
    this.props.quizActions.fetchResults(this.props.name);
  }

  deleteQuiz() {
    this.props.quizActions.deleteQuiz(this.props.name);
  }

  render() {
   return (
     <div className="quiz-item"> 
     <span className="quiz-item">{this.props.name}</span>
     <Button className="quiz-item" onClick={this.sendPopQuiz} bsStyle="success" bsSize="small"> send</Button>
     <Button className="quiz-item" onClick={this.editQuiz} bsStyle="warning" bsSize="small"> edit</Button>
     <Button className="quiz-item" onClick={this.deleteQuiz} bsStyle="danger" bsSize="small"> delete</Button>
    </div>
   );
  };
}

function mapStateToProps(state){
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch){
  return {
    quizActions: bindActionCreators(quizActions,dispatch),
  }
  
  
}
export default connect(mapStateToProps,mapDispatchToProps)(QuizItem);
