import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as questionActions from './actions';
import { socket } from '../common/socket'
import { initializeWebSockets, emitNewQuestion } from './socket'
import Question from './Question';

class QuestionBox extends Component {

  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
    this.initializeWebSockets = initializeWebSockets.bind(this);  
    this.emitNewQuestion = emitNewQuestion.bind(this);
  }

  componentDidMount() {
    this.initializeWebSockets();
  }
  
  handleEnter(event) {
    if (event.keyCode === 13){
      this.emitNewQuestion(event.target.value,this.props.user);
      event.target.value = '';
    }
  };

  render(){
    var { user, questions } = this.props;
    questions = questions.sort((a,b) => b.upvotes.length - a.upvotes.length)
      .map((question,idx)=>{
        return <Question key={idx} index={idx} question={question} />;
      });

    return (
      <div>
        {questions}
        <input type="text" onKeyDown={this.handleEnter}></input> Ask
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions.questions,
    user: state.Users.username

  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(questionActions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionBox);
