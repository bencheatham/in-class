import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, signoutUser } from './actions';
import axios from 'axios';
import {returnStore} from '../main';
import { push } from 'react-router-redux'
import { Link } from 'react-router'
import Header from './Header';

class SignOut extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.actions.signoutUser(this.props.username);
  }
  render(){
    return (
      <div> 
      <Header /> 
      Come visit us again!
      </div>
    );
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
    actions: bindActionCreators({signoutUser}, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SignOut);
