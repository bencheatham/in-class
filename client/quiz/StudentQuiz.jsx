import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Login from '../login/Login'
import Drawer from '../containers/Drawer'
import * as quizActions from './actions'
import {initializeWebSockets} from './socket';

class StudentQuiz extends Component {
  constructor (props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.initializeWebSockets = initializeWebSockets.bind(this);
    
  }
  componentWillMount (){
    this.initializeWebSockets();
  }

  handleClick (e){
    var {storedQuizzes, status, actions} = this.props;
    var answerForLastQuestion = (status === storedQuizzes.length);
    actions.answerQuestion(e.target.value);  
  }

  handleFetch(){
    let quizName = 'AnimalTalk';
    this.props.actions.startQuiz(quizName);
  }

  render() {
    var {storedQuizzes, status} = this.props;
    var self = this;
    var quizzes;
  
    var currentQuestion = status - 1;
    // var currentQuestion = 0;

    if (status !== 0 && status <= storedQuizzes.questions.length){
      quizzes = [
          <div>{storedQuizzes.questions[currentQuestion].question}
            <div>
              <button value={storedQuizzes.questions[currentQuestion].answer} onClick={self.handleClick}>{storedQuizzes.questions[currentQuestion].choices[0]}</button>
              <button value={storedQuizzes.questions[currentQuestion].choice1} onClick={self.handleClick}>{storedQuizzes.questions[currentQuestion].choices[1]}</button>
              <button value={storedQuizzes.questions[currentQuestion].choice2} onClick={self.handleClick}>{storedQuizzes.questions[currentQuestion].choices[2]}</button>
              <button value={storedQuizzes.questions[currentQuestion].choice3} onClick={self.handleClick}>{storedQuizzes.questions[currentQuestion].choices[3]}</button>
            </div>
          </div>
        ];
    } else if (status > storedQuizzes.length) {
      quizzes = 'quiz complete'
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
    storedQuizzes: state.studentQuiz.storedQuizzes,
    status: state.studentQuiz.status
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(quizActions,dispatch)  
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(StudentQuiz);