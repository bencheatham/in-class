import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from './actions';
import { socket } from '../common/socket';
import { initializeWebSockets, emitLogin} from './socket';
import axios from 'axios';


function postCredentials (username, password, url) {
  return new Promise(function (resolve, reject) {
    axios.post(url, {username: username, password: password})
    .then((response) => resolve(response.data))
    .catch(reject);
  });
}

function navigateToProtected () {
  return Promise.resolve(location.href = '/');
}

function setStorage (object) {
  var temp = localStorage.inClass ? JSON.parse(localStorage.inClass) : {} ;
  for (var key in object) {
    temp[key] = object[key];
  }
  localStorage.inClass = JSON.stringify(temp);
  return Promise.resolve(object);
}

function setState (object) {
  // in progress
  // set the state here
  return Promise.resolve();
}




class Login extends Component {

  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);  
    this.initializeWebSockets = initializeWebSockets.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.initializeWebSockets();
  }
  
  handleEnter(event) {
    if (event.keyCode === 13){
      emitLogin(event);
      this.props.actions.login(event.target.value)
      event.target.value = '';
    }
  }

  handleSubmit(form) {
  console.log('form was submitted', form);

  var username = this.refs.username.value;
  var password = this.refs.password.value;
  var url = '/' + this.refs.actions.value;

  postCredentials(username, password, url)
  .then(setStorage)
  .then(setState)
  .then(navigateToProtected)
  .catch(function (error) {
    console.error(error);
  });

  return false;
  }

  render(){
    return (
      <div>

        <form className="login" onSubmit={this.handleSubmit}>
          <select className="actions" ref="actions">
            <option value="login">Log In</option>
            <option value="signup">Sign Up</option>
          </select>
          <br/>
          <input className="username" ref="username" type="text" placeholder="username"/>
          <br/>
          <input className="password" ref="password" type="password" placeholder="password"/>
          <br/>
          <input type="submit" name="Login"/>
        </form>

<br/>
<br/>

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
