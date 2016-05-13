import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, signinUser, signupUser } from './actions';
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
  }

  handleSubmit(event) {
    event.preventDefault();
    var username = this.refs.username.getInputDOMNode().value;
    var password = this.refs.password.getInputDOMNode().value;
    var usertype = this.refs.usertype.getInputDOMNode().value;
    this.props.actions.signupUser(username, password,usertype);
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
  render(){
    return (
      <div>
        <div>
          <Form horizontal callback={this.handleSubmit} >
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={4}>
                <Input ref="username" type="username" placeholder="username" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={4}>
                <Input ref="password" type="password" placeholder="password" />
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({login, signinUser, signupUser}, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
