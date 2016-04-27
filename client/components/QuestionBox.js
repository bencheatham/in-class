import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as questionActions from '../actions/question';

class QuestionBox extends Component {
  render(){

    return (
      <div>
      Hola {this.props.questions[0].text}
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions.questions,
  }
}

// function bindActionCreators(dispatch){
//   return {
//     submitQuestion: bindActionCreators(questionActions.submitQuestion,dispatch),
//     upvote: bindActionCreators(questionActions.upvote,dispatch),
//     downvote: bindActionCreators(questionActions.downvote,dispatch),  
//   };
// }


export default connect(mapStateToProps)(QuestionBox);
