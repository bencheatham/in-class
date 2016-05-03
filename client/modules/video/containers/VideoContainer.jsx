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

   }

  appendIt(){
    console.log('IN APPEND IT')
        console.log((this.props.videoSession))
    if(this.props.videoSession){
     $('#vid-box').append(this.props.videoSession.outerHTML);
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

     // Called when ready to receive call
      ctrl.ready(function(){
     //   form.username.style.background="#55ff5b"; // Turn input green
      //  form.login_submit.hidden="true";  // Hide login button
     //   ctrl.addLocalStream(vid_thumb);   // Place local stream in div
      });        
     //  console.log(ctrl)


      ctrl.receive(function(session){
          // if too many users on the line, than should not be able to connect

          session.connected(function(session){ 
       //     video_out.appendChild(session.video)
            console.log('INNNNN HERERERRERE');
            console.log(session.video);

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
        resolve(ctrl)
      }

      });

  }

  changeSession(session, videoActions){
    console.log('WE ARE CHANGING SESSIONS!');
    console.log(session);
    if(session){
      videoActions.addVideoSession(session);
    }
  }
  
  makeCall() {
    console.log('IN MAKE CALL, ', this.props.calledUser);
      if (!window.phone) alert("Login First!");
      else {
        console.log('dialing');
        phone.dial(this.props.calledUser);
      }
  }
 
  end(){
    console.log('in here!')
    ctrl.hangup();
    //phone.stop();
    window.phone = null;
  }

  mute(){
    var audio = ctrl.toggleAudio();
    // if (!audio) $("#mute").html("Unmute");
    // else $("#mute").html("Mute");
  }

  pause(){
    var video = ctrl.toggleVideo();
    // if (!video) $('#pause').html('Unpause');
    // else $('#pause').html('Pause');
  }


  render() {

    console.log('In Render');

    this.login(this.changeSession, this.props.videoActions, this.props).then(function(){
      console.log('it is a promise!!')
      console.log(window.ctrl)
    })

    if (this.props.calledUser !== null && this.props.videoSession === null){
      console.log('oops HERERERRERE')
      setTimeout(this.makeCall, 3000);
    }

    if (this.props.teacherSelectedUser) {
      let ball = {
        calledUser: this.props.teacherSelectedUser,
        callingUser: this.props.teacherName
      };
      this.props.videoActions.userCallUser(ball);
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
            
          console.log(classVideoPac);
          this.props.videoActions.emitTeacherVideoSession(classVideoPac);
        }

      }
    }

    if (this.props.videoSession === null && this.props.classVideoSession !== null) {
      console.log('Here Adding the Teaches Vid: ', this.props.classVideoSession)
      this.props.videoActions.addVideoSession(this.props.classVideoSession);
    }


    return (
      <div>
        <VideoPlayer data={this.props}/>

        <div id="inCall">
            <button id="end" onClick={this.end}>End</button> 
            <button id="mute" onClick={this.mute}>Mute</button> 
            <button id="pause" onClick={this.pause}>Pause</button>
        </div>

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





