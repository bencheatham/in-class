import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActions from './actions';
import { initializeWebSockets, emitChatMessage } from './socket'
import ChatMessage from './ChatMessage';

class ChatBox extends Component {

  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
    this.initializeWebSockets = initializeWebSockets.bind(this);  
    this.emitChatMessage = emitChatMessage.bind(this);
  }

  componentDidMount() {
    this.initializeWebSockets();
  }
  
  handleEnter(event) {
    if (event.keyCode === 13){
      this.emitChatMessage(event.target.value,this.props.username);
      event.target.value = '';
    }
  };

  render(){
    var { username, chatMessages } = this.props;
    console.log('chatmessages', chatMessages);
    chatMessages = chatMessages.map((message,idx)=>{
        return <ChatMessage key={idx} index={idx} message={message} />;
      });

    return (
      <div>
        {chatMessages}
        <input type="text" onKeyDown={this.handleEnter}></input> [SEND] 
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
