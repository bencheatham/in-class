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
    return (<div>
        <span onClick={() => this.handleClick(question.id)}>
        <Glyphicon  glyph="glyphicon glyphicon-arrow-up" aria-hidden="true"/>
        {question.upvotes.length}
        </span>
       {question.username}: {question.text}
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