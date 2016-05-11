import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as VideoActions from '../../../modules/video/actions';
import { Button } from 'react-bootstrap';
import * as VideoService from '../api/service';

class VideoContainer extends Component {

  constructor(props) {
    super(props);
    this.login = VideoService.login.bind(this);
    this.end = VideoService.end.bind(this);
    this.mute = VideoService.mute.bind(this);

    // jquery actions for video management
    this.removeVideo = this.removeVideo.bind(this);
    this.appendVideo = this.appendVideo.bind(this);
    this.manageVideo = this.manageVideo.bind(this);
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

  componentDidMount() {
    let username = this.props.username;
    this.login(username);
  }

  render() {
    // helper method to render controller
    function renderMuteButton() {
      let label = this.props.mute ? 'Unmute' : 'Mute';
      return (<Button className="btn-warning" id="mute" onClick={this.mute}>{label}</Button>);
    };

    function renderController() {
      if (!this.props.showCtrl) return;
      return (
        <div id="inCall">
          <Button className="btn-danger" id="end" onClick={this.end}>End</Button>
          {renderMuteButton.bind(this)()}
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
    username: state.user.username,
    showCtrl: state.video.showCtrl,
    session: state.video.videoSession,
    mute: state.video.mute,
  };
}

function mapDispatchToProps(dispatch) {
  return {
   videoActions: bindActionCreators(VideoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);
