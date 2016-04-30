import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Login from '../login/Login'
import Drawer from '../containers/Drawer'
import * as quizActions from './actions'
import {initializeWebSockets} from './socket';

class TeacherQuiz extends Component {
  constructor (props){
    super(props);
    this.initializeWebSockets = initializeWebSockets.bind(this);
  }
  componentWillMount (){
    initializeWebSockets();
  }

  handleClick (e){
    var {storedQuizzes, status, actions} = this.props;
  }

  handleFetch(){
    //this.props.actions.startQuiz(quizName);
  }

  render() {
    var {storedQuizzes, status} = this.props;
   
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

export default connect(mapStateToProps,mapDispatchToProps)(TeacherQuiz);