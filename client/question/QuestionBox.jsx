import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as questionActions from '../actions/question';
import Question from './Question';
import { socket } from '../actions/question'

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
    socket.on('questionWithID', data => {
      this.props.actions.submitQuestion(null,data.question)
    });
    socket.on('upvote', data => {
      this.props.actions.upvote(data.id.id)
    });
  }
  
  handleEnter(e) {
    if (e.keyCode === 13){
      socket.emit('question-submitted', {
        username : this.props.user.username,
        text: e.target.value,
        timestamp: Date.now(),
        upvotes: 0,
      });
      
      e.target.value = '';
    }
  };

  render(){
    var { user } = this.props;
    var questions = this.props.questions.sort((a,b) => b.upvotes - a.upvotes)
    .map((question,idx)=>{
      return <Question key={idx} index={idx} question={question} />;
    })

    return (
      <div>
        {user.username} is logged in...
        Ask: <input type="text" onKeyDown={this.handleEnter}></input>
        {questions}
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions.questions,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(questionActions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionBox);
