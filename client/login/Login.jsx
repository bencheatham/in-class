import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, signinUser } from './actions';
import { socket } from '../common/socket';
import { initializeWebSockets, emitLogin} from './socket';
import axios from 'axios';
import {returnStore} from '../main';
import { push } from 'react-router-redux'
import Header from './Header';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);  
    this.initializeWebSockets = initializeWebSockets.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderAlert = this.renderAlert;
  }

  componentDidMount() {
    this.initializeWebSockets();
  }
  
  handleEnter(event) {
    if (event.keyCode === 13){
      var username = this.refs.username.value;
      var password = this.refs.password.value;
      this.props.actions.signinUser(username, password);
      event.target.value = '';
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    this.props.actions.signinUser(username, password);
    return false;
  }
  renderAlert(){
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger"> 
          <strong> Oops! </strong> {this.props.errorMessage}
        </div> 
      )
    }
  }
  render(){
    return (
      <div>
        <Header />
        <form className="login" onSubmit={this.handleSubmit}>
          <input className="username" ref="username" type="text" placeholder="username"/>
          <input className="password" ref="password" type="password" placeholder="password"/>          
          <input type="submit" value="Sign in"name="Login"></input>
          {this.renderAlert()}
        </form>
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.user.errorMessage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({login, signinUser}, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
