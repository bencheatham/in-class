import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as VideoActions from '../../../modules/video/actions';

class VideoContainer extends Component {

  constructor(props) {
    super(props);
    this.changeSession = this.changeSession.bind(this);
    this.login = this.login.bind(this);

    // jquery actions for video management
    // this.swapVideo = this.swapVideo.bind(this);
    this.appendIt = this.appendIt.bind(this);
    this.removeVideo = this.removeVideo.bind(this);
    this.appendVideo = this.appendVideo.bind(this);

    // video controllers
    this.mute = this.mute.bind(this);
    this.end = this.end.bind(this);
    this.pause = this.pause.bind(this);
  }

  appendIt(){
    if(this.props.videoSession){
      $('#vid-box').append(this.props.videoSession.outerHTML);
    }
  };

  appendVideo(session) {
    $('#vid-box').append(session);
    // TODO: save the video to user state instead
    this.props.videoActions.setControllerVisibility(true);
  };

  removeVideo() {
    $('#vid-box').html('');
    this.props.videoActions.setControllerVisibility(false);
  }

  login(changeSession, videoActions) {

    let removeVideo = this.removeVideo;
    let appendVideo = this.appendVideo;

    var phone = window.phone = PHONE({
        number        : this.props.username || "Anonymous", // listen on username line else Anonymous
        publish_key   : 'pub-c-566d8d42-99d0-4d21-bc72-6d376ed70567',
        subscribe_key : 'sub-c-107b4e72-082d-11e6-996b-0619f8945a4f',
        ssl : (('https:' == document.location.protocol) ? true : false)
    });

    var ctrl = window.ctrl = CONTROLLER(phone);

    ctrl.ready(function(){ });

    // receives phone conversation back from PubNub
    ctrl.receive(function(session){
      session.connected(function(session) {
        console.log('hit append session', session);
        appendVideo(session.video);
      });

      session.ended(function(session) {
        // TODO remove the div elements if session ended
        console.log('hits ended');
        console.log('this', this);
        removeVideo();
      });
    });

    ctrl.videoToggled(function(session, isEnabled){
      ctrl.getVideoElement(session.number).toggle(isEnabled); // Hide video is stream paused
    });

    ctrl.audioToggled(function(session, isEnabled){
      ctrl.getVideoElement(session.number).css("opacity",isEnabled ? 1 : 0.75); // 0.75 opacity is audio muted
    });

  }

  changeSession(session, videoActions){
    videoActions.addVideoSession(session);
  }

  end(){
    window.ctrl.hangup();
  }

  mute(){
    var audio = window.ctrl.toggleAudio();
  }

  pause(){
    var video = window.ctrl.toggleVideo();
  }

  // TODO: disable this functionality for now
  hide(){
    this.end();
    this.props.videoActions.addVideoSession("");
    this.removeIt(" ")
  }

  render() {
    // TODO need to investigate this further. This doesn't make sense to be called everytime.
    this.login(this.changeSession, this.props.videoActions);

    // helper method to render controller
    function renderController() {

      if (!this.props.showCtrl) return;
      return (
        <div id="inCall">
          <button id="end" onClick={this.end}>End</button>
          <button id="mute" onClick={this.mute}>Mute</button>
          <button id="pause" onClick={this.pause}>Pause</button>
        </div>
      );
    };

    return (
      <div>
        <div id="vid-box"></div>
        {renderController.bind(this)()}
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
    showCtrl: state.video.showCtrl
  };
}

function mapDispatchToProps(dispatch) {
  return {
   videoActions: bindActionCreators(VideoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);
