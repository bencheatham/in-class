import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, signinUser } from './actions';
import axios from 'axios';
import {returnStore} from '../main';
import { push } from 'react-router-redux'
import { Link } from 'react-router'
import { Image, Row, Col, Navbar, Nav, MenuItem, NavItem, NavDropdown } from 'react-bootstrap';
require('../stylesheets/navbar.scss');
//require('/img/in-class-logo.png');

//const logo = require('../img/in-class-logo.png')


class Header extends Component {

  constructor(props) {
    super(props);
  }

  renderLinks(){
    var classroom = '/classroom/' + this.props.user.usertype; 
    if (this.props.authenticated){
      return (
        <div ul className="nav navbar-nav navbar-left">
          <Link to="">Home </Link>
          <Link to={classroom}>Classroom </Link>
          <Link to="sign-out">Sign Out</Link>
        </div>
      )
    } else {
      return (
        <div ul className="nav navbar-nav navbar-left">
          <Link className="navbar-brand" to="">Home </Link>
          <Link className="navbar-brand" to="sign-in">Sign in </Link>
          <Link className="navbar-brand" to="sign-up">Sign up </Link>
        </div>
      )
    }
  }
  renderLinks2(){
    var classroom = '/classroom/' + this.props.user.usertype; 
    if (this.props.authenticated){
      return (
        <div  className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-left">
            <li><Link className="navbar-brand" to="">Home </Link></li>
            <li><Link className="navbar-brand" to={classroom}>Classroom </Link></li>
            <li><Link className="navbar-brand" to="sign-out">Sign Out</Link></li>
            <li><Link className="navbar-brand" to="about">About</Link></li>
          </ul>
        </div>
      )
    } else {
      return (
        <div  className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-left">
            <li><Link className="navbar-brand" to="">Home </Link></li>
            <li><Link className="navbar-brand" to="sign-in">Sign in </Link></li>
            <li><Link className="navbar-brand" to="sign-up">Sign up </Link></li>
            <li><Link className="navbar-brand" to="about">About</Link></li>
          </ul>
        </div>
      )
    }
  }
  render(){
    return (
      <div>

        <div className="top-navbar">
          <nav className="navbar navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <a className="navbar-brand" href="https://inclass.co"><img className="navbar-brand" src="/images/in-class-logo.png" alt="In Class" />
                </a>
              </div>
              <div>
                {this.renderLinks2()}
              </div>
            </div>
          </nav>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.user.errorMessage,
    authenticated: state.user.authenticated,
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({login, signinUser}, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
