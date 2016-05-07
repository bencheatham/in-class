import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, signinUser, signupUser } from './actions';
import { socket } from '../common/socket';
import { initializeWebSockets, emitLogin} from './socket';
import axios from 'axios';
import {returnStore} from '../main';
import { push } from 'react-router-redux'
import Header from './Header';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderAlert = this.renderAlert;
  }

  handleSubmit(event) {
    event.preventDefault();
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    var usertype = this.refs.usertype.value;
    // console.log(usertype)
    this.props.actions.signupUser(username, password,usertype);
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
          <select ref="usertype">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          <input type="submit" value="Sign up" name="SignUp"></input>
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
    actions: bindActionCreators({login, signinUser, signupUser}, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
