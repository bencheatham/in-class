import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../actions/users';

class VideoContainer extends Component {

   constructor(props) {
    super(props);
    this.state = { 
     videoSession: '',
     phone: window.phone
    };


   }

  login(user) {

    console.log('in video login: ', this.props.username);


    window.phone = PHONE({
        number        : user || "Anonymous", // listen on username line else Anonymous
        publish_key   : 'pub-c-566d8d42-99d0-4d21-bc72-6d376ed70567',
        subscribe_key : 'sub-c-107b4e72-082d-11e6-996b-0619f8945a4f',
        ssl : (('https:' == document.location.protocol) ? true : false)
    });


    phone.ready(function(){ 
      //form.username.style.background="#55ff5b";
    });
    phone.receive(function(session){
        session.connected(function(session) {this.setState({ videoSession: session.video});});
        session.ended(function(session) {this.setState({ videoSession: ''});});
    });

    //return false;   // So the form does not submit.
  }

  
  makeCall(form) {
    if (!window.phone) alert("Login First!");
    else phone.dial("Fred");
    //return false;
  }

  render() {

    this.login(this.props.username);


    return (
      <div>
        <div id="vid-box">
          {videoSession}
        </div>


      </div>
    );
  }
};


function mapStateToProps(state) {

   console.log('LETS LOOK AT STATE: ', state)

  return {
    users: state.Users.users,
    username: state.Users.username
  };
}



