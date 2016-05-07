import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as questionActions from './actions';
import { socket } from '../common/socket'
import _ from 'underscore'
import { emitUpvote } from './socket'

class Question extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    var { message, actions, index, user } = this.props;
    return (
      <div>
       {message.username}: {message.text}
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(questionActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);