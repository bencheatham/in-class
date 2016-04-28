import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as questionActions from '../actions/question';

class Question extends React.Component{
  constructor(props) {
    super(props)
  }


  render() {
    var { question, actions, index } = this.props;
    return (<div>
      <span onClick={() => actions.upvote(question.id)}> [UPVOTE]</span>
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