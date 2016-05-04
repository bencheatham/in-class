import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as thumbActions from './actions';
import { socket } from '../common/socket'
import { initializeWebSockets, emitThumbCheck } from './socket'

class TeacherThumbs extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.initializeWebSockets = initializeWebSockets.bind(this);  
    this.emitThumbCheck = emitThumbCheck.bind(this)
  }

  componentDidMount() {
    this.initializeWebSockets();
  }
  
  handleClick(event) {
    this.emitThumbCheck(this.props.username);
  }

  render(){
    var { username } = this.props;
    
    return (
      <div>
        <button onClick={this.handleClick}>ThumbCheck</button>
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    username: state.user.username
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(thumbActions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(TeacherThumbs);
