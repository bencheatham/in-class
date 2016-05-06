import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as VideoActions from '../../../modules/video/actions';

import VideoPlayer from '../components/VideoPlayer';


class VideoContainer extends Component {

  constructor(props) {
    super(props);
    this.changeSession = this.changeSession.bind(this);
    this.appendIt = this.appendIt.bind(this);
    this.login = this.login.bind(this);
    this.makeCall = this.makeCall.bind(this);
    this.end = this.end.bind(this);
    this.hide = this.hide.bind(this);
    this.removeIt = this.removeIt.bind(this);
    this.swapVideo = this.swapVideo.bind(this);
  }

  appendIt(videoSession){
    console.log('IN APPEND IT')
        console.log((videoSession))
    if(videoSession){
     $('#vid-box').append(videoSession.outerHTML);
    }
  };

  removeIt(){
    console.log('IN REMOVE IT');
    $('#vid-box').html(" ");
  }

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
      this.appendIt();
    }
  };


  login(changeSession, videoActions, props) {
    return new Promise(function(resolve, reject) {


      console.log('in video login: ', props);
      console.log(props.changeSession);

      window.phone = PHONE({
          number        : props.username || "Anonymous", // listen on username line else Anonymous
          publish_key   : 'pub-c-566d8d42-99d0-4d21-bc72-6d376ed70567',
          subscribe_key : 'sub-c-107b4e72-082d-11e6-996b-0619f8945a4f',
          ssl : (('https:' == document.location.protocol) ? true : false),
          media : { audio : true, video : true }
      });
      console.log('window phone')
      console.log(window.phone)


     let ctrl = window.ctrl = CONTROLLER(phone);

  

      ctrl.receive(function(session){
          // if too many users on the line, than should not be able to connect

          session.connected(function(session){ 

            changeSession(session.video, videoActions);

          });
          session.ended(function(session) {
              changeSession(session.video, videoActions);

    //        ctrl.getVideoElement(session.number).remove(); 
          });

      });// Called on incoming call/call ended
      ctrl.videoToggled(function(session, isEnabled){
        ctrl.getVideoElement(session.number).toggle(isEnabled); // Hide video is stream paused
      });
      
      ctrl.audioToggled(function(session, isEnabled){
        ctrl.getVideoElement(session.number).css("opacity",isEnabled ? 1 : 0.75); // 0.75 opacity is audio muted
      });

      if (ctrl){
        resolve(ctrl);
      }

      });

  }

  changeSession(session, videoActions){

    if(session){
      videoActions.addVideoSession(session);
    }
  }

  // @deprecated
  makeCall() {
    if (!window.phone) alert("Login First!");
    else {
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

  hide(){
    this.end();
    this.props.videoActions.addVideoSession("");
    this.removeIt(" ")

  }


  render() {


    this.login(this.changeSession, this.props.videoActions, this.props).then(function(){

    })


    if (this.props.teacherSelectedUser) {
      let ball = {
        calledUser: this.props.teacherSelectedUser,
        callingUser: this.props.teacherName
      };
      this.props.videoActions.userCallUser(ball);
    }

    if (this.props.videoSession !== null){
      this.swapVideo();
    }

    if (this.props.videoSession !== null && this.props.videoSession !== undefined){
     // this.appendIt();
      if (this.props.teacherCall) {

        let stringVideoSession = Object.assign({}, this.props.videSession, {
          session: this.props.videoSession.outerHTML
        });

        if(this.props.classVideoSession === null){
          let classVideoPac = {
            speaker: this.props.calledUser,
            teacher: this.props.teacherName,
            videoSession: stringVideoSession.session
          }
            
          this.props.videoActions.emitTeacherVideoSession(classVideoPac);
        }

      }
    }

    if (this.props.videoSession === null && this.props.classVideoSession !== null) {
      this.props.videoActions.addVideoSession(this.props.classVideoSession);
    }


    return (
      <div>
        <div id="inCall">
            <button id="end" onClick={this.end}>End</button> 
            <button id="mute" onClick={this.mute}>Mute</button> 
            <button id="pause" onClick={this.pause}>Pause</button>
            <button id="hide" onClick={this.hide}>Hide</button>
        </div>
        <br></br>
        <VideoPlayer data={this.props}/>


        <span className="input-group-btn">
            <button type="submit" onClick={this.makeCall} className='btn btn-lg'>Start Video</button>
        </span>


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
    makeCall: state.video.makeCall,
    classVideoSession: state.video.classVideoSession,
    classVideoSpeaker: state.video.classVideoPresenter,
    classVideoTeacher: state.video.classVideoTeacher
  };
}

function mapDispatchToProps(dispatch) {
  return {
   videoActions: bindActionCreators(VideoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);
