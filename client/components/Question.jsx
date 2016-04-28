import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as questionActions from '../actions/question';
import { socket } from '../actions/question'
import _ from 'underscore'

class Question extends React.Component{
  constructor(props) {
    super(props)
  }

  handleClick (id){
    socket.emit('upvote', {id: id})
  }

  render() {
    var { question, actions, index, user } = this.props;
    return (<div>
      
      <span onClick={() => this.handleClick(question.id)}> <span className="glyphicon glyphicon-search" aria-hidden="true"></span> [UPVOTE]</span>
      {index + 1}. {question.username}: {question.text} ---
      votes: {question.upvotes}
      
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions.questions, 
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(questionActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);