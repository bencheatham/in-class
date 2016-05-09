import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as VideoActions from '../../../modules/video/actions';

class VideoContainer extends Component {

  constructor(props) {
    super(props);
    this.changeSession = this.changeSession.bind(this);
    this.appendIt = this.appendIt.bind(this);
    this.login = this.login.bind(this);
    this.makeCall = this.makeCall.bind(this);
    this.swapVideo = this.swapVideo.bind(this);

    this.mute = this.mute.bind(this);
    this.end = this.end.bind(this);
    this.pause = this.pause.bind(this);
  }

  appendIt(){
    if(this.props.videoSession){
      $('#vid-box').append(this.props.videoSession.outerHTML);
    }
  };

  swapVideo() {
    // TODO swap the video if current session is not the same as the others
    if (!this.props.videoSession) {
      return;
    }

    let id = $('#vid-box video').attr('data-number');
    let newId = this.props.videoSession.getAttribute('data-number');

    // if not the same, just swap it
    if (newId !== id) {
      $('#vid-box').empty();
    }
    this.appendIt();
  };

  login(changeSession, videoActions) {
    var phone = window.phone = PHONE({
        number        : this.props.username || "Anonymous", // listen on username line else Anonymous
        publish_key   : 'pub-c-566d8d42-99d0-4d21-bc72-6d376ed70567',
        subscribe_key : 'sub-c-107b4e72-082d-11e6-996b-0619f8945a4f',
        ssl : (('https:' == document.location.protocol) ? true : false)
    });

    // var ctrl = window.ctrl = CONTROLLER(phone);

    phone.ready(function(){
      // TODO change this later
      //form.username.style.background="#55ff5b";
    });

    // receives phone conversation back from PubNub
    phone.receive(function(session){
      session.connected(function(session) {
        console.log('INNNNN HERERERRERE');
        console.log(session.video);

        changeSession(session.video, videoActions);
      });

      session.ended(function(session) {
        changeSession(session.video, videoActions);
      });
    });
  }

  changeSession(session, videoActions){
    videoActions.addVideoSession(session);
  }

  // @deprecated
  makeCall() {
    console.log('IN MAKE CALL, ', this.props.calledUser);
    if (!window.phone) alert("Login First!");
    else {
      console.log('dialing');
      phone.dial(this.props.calledUser);
    }
  }

  end(){
    ctrl.hangup();
    window.phone = null;
  }

  mute(){
    var audio = ctrl.toggleAudio();
  }

  pause(){
    var video = ctrl.toggleVideo();
  }

  // TODO: disable this functionality for now
  hide(){
    this.end();
    this.props.videoActions.addVideoSession("");
    this.removeIt(" ")
  }

  render() {
    console.log('In Render');
    this.login(this.changeSession, this.props.videoActions);

    if (this.props.teacherSelectedUser) {
      let ball = {
        calledUser: this.props.teacherSelectedUser,
        callingUser: this.props.teacherName
      };
      this.props.videoActions.userCallUser(ball);
    }

    if (this.props.videoSession !== null){
      this.swapVideo();

      if (this.props.teacherCall) {
        let classVideoPac = {
          speaker: this.props.calledUser,
          teacher: this.props.teacher,
          videoSession: this.props.videoSession
        };
        console.log(classVideoPac)
        this.props.videoActions.emitTeacherVideoSession(classVideoPac);
      }
    }


    return (
      <div>
        <div id="inCall">
          <button id="end" onClick={this.end}>End</button>
          <button id="mute" onClick={this.mute}>Mute</button>
          <button id="pause" onClick={this.pause}>Pause</button>
        </div>
        <div id="vid-box"></div>
      </div>
    );
  }
};



function mapStateToProps(state) {
  return {
    username: state.Users.username,
    calledUser: state.video.calledUser,
    callingUser: state.video.callingUser,
    videoSession: state.video.videoSession,
    teacherCall: state.video.teacherCall,
    teacherSelectedUser: state.video.teacherSelectedUser,
    teacherName: state.video.teacherName,
    makeCall: state.video.makeCall
  };
}

function mapDispatchToProps(dispatch) {
  return {
   videoActions: bindActionCreators(VideoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);
