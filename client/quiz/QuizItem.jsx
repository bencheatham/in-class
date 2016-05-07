import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import _ from 'underscore'
import Login from '../login/Login'
import Video from '../video/Video'
import Drawer from '../containers/Drawer'
import { submitQuiz, updateQuiz, editQuiz } from './actions'
import { fetchQuiz, seeResults} from './socket'

class QuizItem extends Component {

  constructor(props){
    super(props);
    this.sendPopQuiz = this.sendPopQuiz.bind(this);
    this.editQuiz = this.editQuiz.bind(this); 
  }

  sendPopQuiz () {
    fetchQuiz(this.props.name);
  }
  seeResults () {
    fetchResults(this.props.name);
  }

  editQuiz () {
    this.props.actions.editQuiz(this.props.name);
  }

  render() {
   return (
     <div> 
     {this.props.name} 
     <button onClick={this.sendPopQuiz}> Send Pop Quiz</button>
     <button onClick={this.editQuiz}> Edit Quiz</button>
     <button onClick={this.editQuiz}> View Quiz</button>
     <button onClick={this.seeResults}> See Results</button>
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
    actions: bindActionCreators({ submitQuiz, updateQuiz, editQuiz },dispatch),
  }
  
  
}
export default connect(mapStateToProps,mapDispatchToProps)(QuizItem);
