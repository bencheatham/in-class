import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, signinUser } from './actions';
import axios from 'axios';
import {returnStore} from '../main';
import { push } from 'react-router-redux'
import { Link } from 'react-router'

class Header extends Component {

  constructor(props) {
    super(props);
  }

  renderLinks(){
    if (this.props.authenticated){
      return (
        <div>
          <Link to="about">About </Link>
          <Link to="quiz">Classroom </Link>
          <Link to="sign-out">Sign Out</Link>
        </div>
      )
    } else {
      return (
        <div>
          <Link to="about">About </Link>
          <Link to="sign-in">Sign in </Link>
          <Link to="sign-up">Sign up </Link>
        </div>
      )
    }
  }
  render(){
    return (
      <div>{this.renderLinks()}
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.user.errorMessage,
    authenticated: state.user.authenticated,
    username: state.user.username,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({login, signinUser}, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
