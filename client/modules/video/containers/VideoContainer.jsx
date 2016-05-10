import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as VideoActions from '../../../modules/video/actions';

class VideoContainer extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);

    // jquery actions for video management
    // this.swapVideo = this.swapVideo.bind(this);
    this.appendIt = this.appendIt.bind(this);
    this.removeVideo = this.removeVideo.bind(this);
    this.appendVideo = this.appendVideo.bind(this);

    // video controllers
    // this.mute = this.mute.bind(this);
    this.end = this.end.bind(this);
    // this.pause = this.pause.bind(this);
  }

  appendIt(){
    if(this.props.videoSession){
      $('#vid-box').append(this.props.videoSession.outerHTML);
    }
  };

  appendVideo(session) {
    // $('#vid-box').append(session);
    document.getElementById("vid-box").appendChild(session.video);

    // TODO: save the video to user state instead
    this.props.videoActions.setControllerVisibility(true);
  };

  removeVideo() {
    $('#vid-box').html('');
    this.props.videoActions.setControllerVisibility(false);
  }

  login() {
    let removeVideo = this.removeVideo;
    let appendVideo = this.appendVideo;

    var phone = window.phone = PHONE({
        number        : this.props.username || "Anonymous", // listen on username line else Anonymous
        publish_key   : 'pub-c-566d8d42-99d0-4d21-bc72-6d376ed70567',
        subscribe_key : 'sub-c-107b4e72-082d-11e6-996b-0619f8945a4f',
        ssl : (('https:' == document.location.protocol) ? true : false)
    });

    phone.ready(function(){ });

    // receives phone conversation back from PubNub
    phone.receive(function(session){
      session.connected(function(session) {
        console.log('hit append session', session);
        appendVideo(session);
      });

      session.ended(function(session) {
        // TODO remove the div elements if session ended
        console.log('hits ended');
        removeVideo();
      });
    });
  }

  end(){
    window.phone.hangup();
  }

  render() {
    // TODO need to investigate this further. This doesn't make sense to be called everytime.
    this.login();

    // helper method to render controller
    function renderController() {

      if (!this.props.showCtrl) return;
      return (
        <div id="inCall">
          <button id="end" onClick={this.end}>End</button>
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
