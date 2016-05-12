import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../actions';

class Video extends Component {

  render() {
    var value = this.props.value.toString();
    const { actions } = this.props;
    return (
      <div id="player">

      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    value: state.Video.value
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
)(Video);