import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ChatBox from './ChatBox'
import Drawer from '../containers/Drawer'

class ChatContainer extends Component {


 render() {
   return (
     <div>
      <span><h1>Chat message</h1></span>
      <ChatBox />
    </div>
   );
 };
}


export default ChatContainer;