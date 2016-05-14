import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as questionActions from './actions';
import { socket } from '../common/socket'
import _ from 'underscore'
import { emitUpvote } from './socket'
import { Glyphicon } from 'react-bootstrap';

class Question extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {

    function displayDate(timestamp) {
      let date = new Date(timestamp);
      let hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
      let minute = date.getMinutes();
      let period = date.getHours() > 12 ? 'PM' : 'AM';

      let today = new Date();



      let ret = hour + ':' + minute + ' ' + period;
      return ret;
    }

    var { message, actions, index, user } = this.props;
    return (
      <div className="chat-message">
        <div className="chat-message-wrapper">
            <div className="chat-header">
              <span className="username">{message.username}</span>
              <span className="timestamp">{displayDate(message.timestamp)}</span>
            </div>
            <div className="chat-body">
              <span className="message">{message.text}</span>
            </div>

        </div>

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
