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
      return 'Sign in'
    } else {
      return <Link to="quiz">Sign In</Link>
    }
  }
  render(){
    return (
      <div> This is the header {this.renderLinks()}
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
