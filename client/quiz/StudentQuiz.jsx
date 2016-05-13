import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Login from '../login/Login'
import Drawer from '../containers/Drawer'
import * as quizActions from './actions'
import {initializeWebSockets, closeWebSockets} from './socket';

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
    this.props.quizActions.answerQuestion(e.target.value);  
  }

  render() {
    var {storedQuizzes, status} = this.props;
    var self = this;
    var quizzes;
  
    var currentQuestion = status;

    if (status < storedQuizzes.questions.length){
      quizzes = [
          <div>{storedQuizzes.questions[currentQuestion].question}
            <div>
              <button value={storedQuizzes.questions[currentQuestion].choices[0]} onClick={self.handleClick}>{storedQuizzes.questions[currentQuestion].choices[0]}</button>
              <button value={storedQuizzes.questions[currentQuestion].choices[1]} onClick={self.handleClick}>{storedQuizzes.questions[currentQuestion].choices[1]}</button>
              <button value={storedQuizzes.questions[currentQuestion].choices[2]} onClick={self.handleClick}>{storedQuizzes.questions[currentQuestion].choices[2]}</button>
              <button value={storedQuizzes.questions[currentQuestion].choices[3]} onClick={self.handleClick}>{storedQuizzes.questions[currentQuestion].choices[3]}</button>
            </div>
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