import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as thumbActions from './actions';
import { socket } from '../common/socket'
import { initializeWebSockets, closeWebSockets, emitThumbEvent } from './socket'

class StudentThumbs extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.initializeWebSockets = initializeWebSockets.bind(this);  
    this.closeWebSockets = closeWebSockets.bind(this);
    this.emitThumbEvent = emitThumbEvent.bind(this)
  }

  componentDidMount() {
    this.initializeWebSockets();
  }
  componentWillUnMount (){
    this.closeWebSockets();
  }
  
  handleClick(event) {
    this.emitThumbEvent(event.target.value,this.props.username);
  }

  render(){
    var { username } = this.props;
    
    return (
      <div>
        <button value="up" onClick={this.handleClick}>Up</button>
        <button value="neutral" onClick={this.handleClick}>Neutral</button>
        <button value="down" onClick={this.handleClick} >Down</button>
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

export default connect(mapStateToProps,mapDispatchToProps)(StudentThumbs);
