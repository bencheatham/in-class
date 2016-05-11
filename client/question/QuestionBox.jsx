import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as questionActions from './actions';
import { socket } from '../common/socket'
import { initializeWebSockets, closeWebSockets, emitNewQuestion,loadQuestions } from './socket'
import Question from './Question';

class QuestionBox extends Component {

  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
    this.initializeWebSockets = initializeWebSockets.bind(this);  
    this.emitNewQuestion = emitNewQuestion.bind(this);
    this.loadQuestions = loadQuestions.bind(this);
    this.closeWebSockets = closeWebSockets.bind(this);
  }

  componentDidMount() {
    this.initializeWebSockets();
    this.loadQuestions();
  }

  componentWillUnmount(){
    this.closeWebSockets();
  }
  
  handleEnter(event) {
    if (event.keyCode === 13){
      this.emitNewQuestion(event.target.value,this.props.username);
      event.target.value = '';
    }
  };

  render(){
    var { username, questions } = this.props;
    questions = questions.sort((a,b) => b.upvotes.length - a.upvotes.length)
      .map((question,idx)=>{
        return <Question key={idx} index={idx} question={question} />;
      });

    return (
      <div>
        {questions}
        <input type="text" onKeyDown={this.handleEnter}></input> [ASK]
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions.questions,
    username: state.user.username
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(questionActions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionBox);
