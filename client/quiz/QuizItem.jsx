import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import _ from 'underscore'
import Login from '../login/Login'
import Video from '../video/Video'
import Drawer from '../containers/Drawer'
import { fetchResults, submitQuiz, updateQuiz, editQuiz } from './actions'
import { fetchQuiz, seeResults} from './socket'
import { Button } from 'react-bootstrap';

class QuizItem extends Component {

  constructor(props){
    super(props);
    this.sendPopQuiz = this.sendPopQuiz.bind(this);
    this.editQuiz = this.editQuiz.bind(this); 
    this.seeResults = this.seeResults.bind(this);
  }

  sendPopQuiz () {
    fetchQuiz(this.props.name);
  }

  seeResults () {
    this.props.actions.fetchResults(this.props.name);
  }

  editQuiz () {
    this.props.actions.editQuiz(this.props.name);
  }

  render() {
   return (
     <div> 
     {this.props.name} 
     <Button onClick={this.sendPopQuiz}> Send</Button>
     <Button onClick={this.editQuiz}> Edit</Button>
     <Button onClick={this.editQuiz}> View </Button>
     <Button onClick={this.seeResults}> See Results</Button>
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
    actions: bindActionCreators({ fetchResults, submitQuiz, updateQuiz, editQuiz },dispatch),
  }
  
  
}
export default connect(mapStateToProps,mapDispatchToProps)(QuizItem);
