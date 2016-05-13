import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, signinUser } from './actions';
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
    console.log('i am in here')
    console.log(this.refs.username.getInputDOMNode().value)
    event.preventDefault();
    var username = this.refs.username.getInputDOMNode().value;
    var password = this.refs.password.getInputDOMNode().value;
    this.props.actions.signinUser(username, password);
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({login, signinUser}, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
