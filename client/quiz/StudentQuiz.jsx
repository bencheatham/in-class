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
    initializeWebSockets();
  }

  handleClick (e){
    var {storedQuizzes, status, actions} = this.props;
    var answerForLastQuestion = (status === storedQuizzes.length);
    actions.answerQuestion(e.target.value);  
  }

  handleFetch(){
    let quizName = 'quiz2';
    this.props.actions.startQuiz(quizName);
    console.log('fetch!')
  }

  render() {
    var {storedQuizzes, status} = this.props;
    var self = this;
    var quizzes;
    var currentQuestion = status - 1;

    if (status !== 0 && status <= storedQuizzes.length){
      quizzes = [
          <div>{storedQuizzes[currentQuestion].question}
            <div>
              <button value={storedQuizzes[currentQuestion].answer} onClick={self.handleClick}>{storedQuizzes[currentQuestion].answer}</button>
              <button value={storedQuizzes[currentQuestion].choice1} onClick={self.handleClick}>{storedQuizzes[currentQuestion].choice1}</button>
              <button value={storedQuizzes[currentQuestion].choice2} onClick={self.handleClick}>{storedQuizzes[currentQuestion].choice2}</button>
              <button value={storedQuizzes[currentQuestion].choice3} onClick={self.handleClick}>{storedQuizzes[currentQuestion].choice3}</button>
            </div>
          </div>
        ];
    } else if (status > storedQuizzes.length) {
      quizzes = 'quiz complete'
    }

    return (
      <div>
        <button onClick={this.handleFetch}>Fetch Your Quizzes</button>  
        {quizzes}
      </div>
     );
 };
}

function mapStateToProps(state){
  return {
    user: state.user,
    quiz: state.quiz,
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