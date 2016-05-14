 import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, signinUser, signupUser, updateLogin } from './actions';
import { socket } from '../common/socket';
import { initializeWebSockets, emitLogin} from './socket';
import axios from 'axios';
import {returnStore} from '../main';
import { push } from 'react-router-redux';
import Header from './Header';
import { Form, FormGroup, FormControl, Input, Col, ControlLabel, Checkbox, Button } from 'react-bootstrap';


class SignUp extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderAlert = this.renderAlert;
    this.handleChange = this.handleChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(event) {
    var usertype = this.refs.usertype.getInputDOMNode().value;
    this.props.actions.signupUser(this.props.credentials.username, this.props.credentials.password,usertype);
    return false;

  }

  renderAlert(){
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger"> 
          <strong> Oops! </strong> {this.props.errorMessage}
        </div> 
      );
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
                <FormControl onChange={this.handleUsernameChange} value={this.props.credentials.username}  type="username" placeholder="username" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={4}>
                <FormControl onChange={this.handlePasswordChange} value={this.props.credentials.password} type="password" placeholder="password" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={2}>
                Select Role
              </Col>
              <Col sm={4}>
                <Input ref="usertype" type="select" componentClass="select" placeholder="student">
                  <option value="student">student</option>
                  <option value="teacher">teacher</option>
                </Input>
              </Col>
            </FormGroup>


            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button bsStyle="primary" bsSize="large" active value="Sign Up" type="submit" name="SignUp" onClick={this.handleSubmit} >
                  Sign Up{this.renderAlert()}
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
    credentials: state.user.credentials
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({login, signinUser, signupUser, updateLogin}, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
