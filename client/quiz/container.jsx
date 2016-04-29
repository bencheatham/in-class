import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Login from '../login/Login'
import QuizForm from '../quiz/QuizForm'
import Drawer from '../containers/Drawer'

class QuizContainer extends Component {


 render() {
  console.log(this.props.quiz.quizSize);
   return (
     <div>
      <span><h1>Create a quiz</h1></span>
      <QuizForm />
    </div>
   );
 };
}

function mapStateToProps(state){
  return {
    user: state.user,
    quiz: state.quiz,
  }
}

// function mapStateToProps(dispatch){
//   actions: bindActionCreators({ submitQuiz },dispatch)
  
// }

export default connect(mapStateToProps)(QuizContainer);