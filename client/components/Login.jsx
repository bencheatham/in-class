import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as questionActions from '../actions/question';
import { login } from '../actions/user';
import Question from './Question';
import { socket } from '../actions/question'


class Login extends Component {

  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);  
  }

  componentDidMount() {
    // initializeWebSockets();
    socket.on('login', data => {
      console.log(data);
      this.props.actions.login(data.username);
    });
  }
  
  handleEnter(e) {
    if (e.keyCode === 13){
      socket.emit('login', {
        username : e.target.value
      });
      e.target.value = '';
    }
  };

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
