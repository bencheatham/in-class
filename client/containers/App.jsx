import React, { Component } from 'react';
//import {Navbar, NavBrand, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import {logoutAndRedirect} from '../modules/auth/actions';

//import '../styles/core.scss';

// @connect((state) => {
//     return {
//      isAuthenticated: state.auth.isAuthenticated
//     };
// })
export default class App extends Component {

render () {

 // const {dispatch} = this.props;
   console.log('in app render')
   console.log(this.props.children)

    return (
      <div>
                          {this.props.children}

        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/">In Class - Enhancing Teacher-Student Experience</Link>
            </div>
            <div id="navbar">
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/login">Login</Link></li>
                    {this.props.isAuthenticated
                     ? <li><a href='#' onClick={() => this.props.dispatch(logoutAndRedirect())}>Logout</a> </li>
                     : ''
                    }
                </ul>
            </div>
          </div>
        </nav>
        <div className='container'>
            <div className='row'>
                <div className='col-xs-12'>
                    {this.props.children}
                </div>
            </div>
        </div>
      </div>

    );
}
}