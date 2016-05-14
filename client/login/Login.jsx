import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateLogin, login, signinUser } from './actions';
import { socket } from '../common/socket';
import { initializeWebSockets, emitLogin} from './socket';
import axios from 'axios';
import {returnStore} from '../main';
import { push } from 'react-router-redux';
import Header from './Header';
import { Form, FormGroup, FormControl, Input, Col, ControlLabel, Checkbox, Button } from 'react-bootstrap';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);  
    this.initializeWebSockets = initializeWebSockets.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderAlert = this.renderAlert;
    this.handleChange = this.handleChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidMount() {
    this.initializeWebSockets();
  }
  
  handleEnter(event) {
    if (event.keyCode === 13){
      var username = this.refs.username.getInputDOMNode().value;
      var password = this.refs.password.getInputDOMNode().value;
      this.props.actions.signinUser(username, password);
      event.target.value = '';
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.signinUser(this.props.credentials.username, this.props.credentials.password);
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

  handleUsernameChange(e){
    this.handleChange(e.target.value,null)
  }

  handlePasswordChange(e){
    this.handleChange(null,e.target.value)
  }

  handleChange(username,password){
    let credentials = {username,password};
    this.props.actions.updateLogin(credentials);
  }
  render(){
    return (

      <div>
        <Header />

        <div>
          <Form horizontal callback={this.handleSubmit} >
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={4}>
                <FormControl onChange={this.handleUsernameChange} value={this.props.credentials.username} type="username" placeholder="username" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={4}>
                <FormControl onChange={this.handlePasswordChange} value={this.props.credentials.password} ref="password" type="password" placeholder="password" />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button bsStyle="primary" bsSize="large" active value="Sign In" type="submit" name="Login" onClick={this.handleSubmit} >
                  Sign in{this.renderAlert()}
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.user.errorMessage,
    credentials: state.user.credentials,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({updateLogin, login, signinUser}, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
