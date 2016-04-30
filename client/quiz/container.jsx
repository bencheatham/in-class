import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Login from '../login/Login'
import CreateQuiz from '../quiz/CreateQuiz'
import Drawer from '../containers/Drawer'
import { addQuizForm, submitQuiz, fetchQuiz} from './actions'

class QuizContainer extends Component {
  constructor (props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  handleClick (){
    this.props.actions.addQuizForm();
  }

  handleSubmission (){
    this.props.actions.submitQuiz(this.refs.title.value,this.props.quiz.quizzes);
  }

  render() {
    var quizForms = [];
    for (var i = 0; i < this.props.quiz.questionForms; i++){
      quizForms.push(<CreateQuiz handleSubmission={this.handleSubmission} key={i} id={i} />);
    }
    return (
      <div>
        <span><h1>Create a new quiz.</h1></span>
        <span>Quiz title:</span>
        <input type="text" ref="title"></input>
        <button onClick={this.handleSubmission}> Create Quiz</button>
        {quizForms}
        <div onClick={this.handleClick}>[ + + + + +]</div>
      </div>
     );
 };
}

function mapStateToProps(state){
  return {
    user: state.user,
    quiz: state.quiz,
    storedQuizzes: state.storedQuizzes
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({ addQuizForm, submitQuiz, fetchQuiz },dispatch)  
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizContainer);