import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as VideoActions from '../../../modules/video/actions';
import { Button } from 'react-bootstrap';

class VideoContainer extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);

    // jquery actions for video management
    this.removeVideo = this.removeVideo.bind(this);
    this.appendVideo = this.appendVideo.bind(this);
    this.manageVideo = this.manageVideo.bind(this);

    // video controllers
    this.end = this.end.bind(this);
  }

  appendVideo(session) {
    document.getElementById("vid-box").appendChild(session.video);
    this.props.videoActions.setControllerVisibility(true);
  };

  removeVideo() {
    $('#vid-box').html('');
    this.props.videoActions.setControllerVisibility(false);
  };

  // @deprecated
  manageVideo(session) {
    this.props.videoActions.addVideoSession(session);
  };

  login() {
    let removeVideo = this.removeVideo;
    let appendVideo = this.appendVideo;
    let manageVideo = this.manageVideo;

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
        appendVideo(session);
      });

      session.ended(function(session) {
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
          <Button className="btn-danger" id="end" onClick={this.end}> End </Button>
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
    showCtrl: state.video.showCtrl,
    session: state.video.videoSession,
  };
}

function mapDispatchToProps(dispatch) {
  return {
   videoActions: bindActionCreators(VideoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);