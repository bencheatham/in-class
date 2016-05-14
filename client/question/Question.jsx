import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as questionActions from './actions';
import { socket } from '../common/socket';
import _ from 'underscore';
import { emitUpvote } from './socket';
import { Glyphicon } from 'react-bootstrap';

class Question extends React.Component{
  constructor(props) {
    super(props)
  }

  handleClick (id){
    emitUpvote(id,this.props.user.username);
  }

  render() {
    var { question, actions, index, user } = this.props;

    function displayDate(timestamp) {
      let date = new Date(timestamp);
      let hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
      let minute = date.getMinutes();
      let period = date.getHours() > 12 ? 'PM' : 'AM';

      let today = new Date();



      let ret = hour + ':' + minute + ' ' + period;
      return ret;
    }


    return (
      <div className="question">
        <div className="question-header">
          <span className="icon">
              <Glyphicon onClick={() => this.handleClick(question.id)} glyph="glyphicon glyphicon-arrow-up" aria-hidden="true"/>
          </span>
          <span className="upvote">
              {question.upvotes.length}
          </span>
          <span className="username">{question.username}</span>
          <span className="timestamp">{displayDate(question.timestamp)}</span>
        </div>
        <div className="question-body">
          <span className="content">{question.text}</span>
        </div>
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions.questions,
    user: state.user,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(questionActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
