import React, { Component } from 'react';
import { connectToWebSockets, initiateWebSocketListeners, disconnectFromWebSocket } from './socket';

export default function(WrappedComponent) {

  class SocketManager extends Component {
    constructor(props) {
      super(props);
    }

    componentWillMount(){
      connectToWebSockets()
      initiateWebSocketListeners(); 
    }

    componentWillUnmount(){
      disconnectFromWebSocket();
    }

    render () {
      return <WrappedComponent {...this.props} />;
    }
  }
  
  return SocketManager;

}
