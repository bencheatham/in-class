import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from './actions';
import { socket } from '../common/socket';
import { initializeWebSockets, emitLogin} from './socket';


class Login extends Component {

  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);  
    this.initializeWebSockets = initializeWebSockets.bind(this);  
  }

  componentDidMount() {
    this.initializeWebSockets();
  }
  
  handleEnter(event) {
    if (event.keyCode === 13){
      emitLogin(event);
      event.target.value = '';
    }
  }

  render(){
    return (
      <div>
        Login: <input type="text" onKeyDown={this.handleEnter}></input>
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({login}, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
