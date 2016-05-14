import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Login from '../login/Login'
import Drawer from '../containers/Drawer'
import * as quizActions from './actions'
import {initializeWebSockets, closeWebSockets} from './socket';
import { Button, ButtonGroup } from 'react-bootstrap';
require('../stylesheets/sidebar.scss');

class StudentQuiz extends Component {
  constructor (props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.initializeWebSockets = initializeWebSockets.bind(this);
    this.closeWebSockets = closeWebSockets.bind(this);
  }
  componentWillMount (){
    this.initializeWebSockets();
  }

  componentWillUnMount (){
    this.closeWebSockets();
  }

  handleClick (e){  
    console.log(e.target.value);
    this.props.quizActions.answerQuestion(e.target.value);  
  }

  render() {
    var {storedQuizzes, status} = this.props;
    var self = this;
    var quizzes;
    
    var currentQuestion = storedQuizzes.questions[status];

    if (status < storedQuizzes.questions.length){
      quizzes = [
          <div>{storedQuizzes.questions[status].question} <span className="quiz-status">({status} of {storedQuizzes.questions.length})</span>            
              <div className="quiz-buttons"><Button bsStyle="primary" value={currentQuestion.choices[0]} onClick={self.handleClick}>1</Button><Button value={currentQuestion.choices[0]} onClick={self.handleClick}>{currentQuestion.choices[0]}</Button></div>
              <div className="quiz-buttons"><Button bsStyle="primary" value={currentQuestion.choices[1]} onClick={self.handleClick}>2</Button><Button value={currentQuestion.choices[1]} onClick={self.handleClick}>{currentQuestion.choices[1]}</Button></div>
              <div className="quiz-buttons"><Button bsStyle="primary" value={currentQuestion.choices[2]} onClick={self.handleClick}>3</Button><Button value={currentQuestion.choices[2]} onClick={self.handleClick}>{currentQuestion.choices[2]}</Button></div>
              <div className="quiz-buttons"><Button bsStyle="primary" value={currentQuestion.choices[3]} onClick={self.handleClick}>4</Button><Button value={currentQuestion.choices[3]} onClick={self.handleClick}>{currentQuestion.choices[3]}</Button></div>
          </div>
        ];
    } else {
      quizzes = 'Thank you for completing the quiz!'
    }

    return (
      <div>
        {quizzes}
      </div>
     );
 };
}

function mapStateToProps(state){
  return {
    user: state.user,
    quiz: state.teacherQuiz,
    storedQuizzes: state.studentQuiz.storedQuizzes.quiz,
    status: state.studentQuiz.status
  }
}

function mapDispatchToProps(dispatch){
  return {
    quizActions: bindActionCreators(quizActions,dispatch)  
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(StudentQuiz);