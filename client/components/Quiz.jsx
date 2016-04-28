import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as QuizActions from '../actions/quiz';

class Quiz extends React.Component {

  render() {
    const { actions } = this.props;
    return (
      <div>
        <h4>Quiz</h4>
        <div>Q1: state needed here</div>
        <button className="btn btn-primary" onClick={actions.accept}>accept</button>
        <button className="btn btn-primary" onClick={actions.reject}>reject</button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    quizes: state.quiz
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(QuizActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
