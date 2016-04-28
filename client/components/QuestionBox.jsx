import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as questionActions from '../actions/question';
import Question from './Question';
import { socket } from '../actions/question'
// var socket = require('socket.io-client');

// socket = socket().connect('http://localhost:8000');

// var serverEvents = {
//   'question-submitted': updateQuestionsList,
//   'upvote': updateVotes,
// };

// var initializeWebSockets = () => {
//   for (var key in serverEvents) { 
//     socket.on(key, serverEvents[key].bind(socket)); 
//   }
// };

class QuestionBox extends Component {

  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);  
  }

  componentDidMount() {
    // initializeWebSockets();
    socket.emit('add user', {username: 'sterv'});
    console.log('mounting component')
    socket.on('question-submitted', data => {
      this.props.actions.submitQuestion(null,data.question)
    });
  }
  
  handleEnter(e) {
    if (e.keyCode === 13){
      this.props.actions.submitQuestion(e.target.value);
      e.target.value = '';
    }
  };

  render(){
    var questions = this.props.questions.sort((a,b) => b.upvotes - a.upvotes)
    .map((question,idx)=>{
      return <Question key={idx} index={idx} question={question} />;
    })
    // console.log(socket);

    return (
      <div>
        <input type="text" onKeyDown={this.handleEnter}></input>
        {questions}
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions.questions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(questionActions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionBox);
