import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActions from './actions';
import { initializeWebSockets, emitChatMessage, loadChatMessages, closeWebSockets } from './socket'
import ChatMessage from './ChatMessage';
import { Button } from 'react-bootstrap';
require('../stylesheets/sidebar.scss');

class ChatBox extends Component {

  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
    this.initializeWebSockets = initializeWebSockets.bind(this);  
    this.emitChatMessage = emitChatMessage.bind(this);
    this.loadChatMessages = loadChatMessages.bind(this);
    this.closeWebSockets = closeWebSockets.bind(this);
  }

  componentDidMount() {
    this.initializeWebSockets();
    this.loadChatMessages();
  }

  componentWillUnmount(){
    this.closeWebSockets();
  }
  
  handleEnter(event) {
    if (event.keyCode === 13){
      this.emitChatMessage(event.target.value,this.props.username);
      event.target.value = '';
    }
  };

  render(){
    var { username, chatMessages } = this.props;
    chatMessages = chatMessages.map((message,idx)=>{
        return <ChatMessage key={idx} index={idx} message={message} />;
      });

    return (
      <div className="chatBox">
        {chatMessages}
        <textarea type="text" className="text-input-for-modal" placeholder="Send a message" onKeyDown={this.handleEnter}></textarea>
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    chatMessages: state.chat.chatMessages,
    username: state.user.username
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(chatActions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatBox);
