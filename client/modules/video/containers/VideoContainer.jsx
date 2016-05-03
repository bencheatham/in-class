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

  }

  // componentWillMount() {
  //   console.log('at componentWillMount');
  //   console.log('this.changeSession', this.changeSession);
  //   console.log('this.props.videoActions', this.props.videoActions);
  //   this.login(this.changeSession, this.props.videoActions);
  // }
  //
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('nextProps', nextProps);
  //   console.log('nextState', nextState);
  //   // console.log('nextProps session', nextProps.videoSession);
  //   // console.log('current session', this.props.videoSession);
  //
  //   console.log('nextProps user', nextProps.calledUser);
  //   console.log('current user', this.props.calledUser);
  //
  //   return nextProps.calledUser !== this.props.calledUser;
  // }

  appendIt(){
    if(this.props.videoSession){
     $('#vid-box').append(this.props.videoSession.outerHTML);
    }
  };

  login(changeSession, videoActions) {
    window.phone = PHONE({
        number        : this.props.username || "Anonymous", // listen on username line else Anonymous
        publish_key   : 'pub-c-566d8d42-99d0-4d21-bc72-6d376ed70567',
        subscribe_key : 'sub-c-107b4e72-082d-11e6-996b-0619f8945a4f',
        ssl : (('https:' == document.location.protocol) ? true : false)
    });

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

  makeCall() {
    console.log('IN MAKE CALL, ', this.props.calledUser);
      if (!window.phone) alert("Login First!");
      else {
        console.log('dialing');
        phone.dial(this.props.calledUser);
      }
  }

  render() {

    console.log('In Render');

    this.login(this.changeSession, this.props.videoActions);

    // TODO do not makeCall unless if i told you so
    if (this.props.calledUser !== null){
      setTimeout(this.makeCall, 3000);

    }

    if (this.props.teacherSelectedUser) {
      let ball = {
        calledUser: this.props.teacherSelectedUser,
        callingUser: this.props.teacherName
      };
      this.props.videoActions.userCallUser(ball);
    }

    if (this.props.videoSession !== null){
      this.appendIt();
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
        <div id="vid-box">

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
    makeCall: state.video.makeCall
  };
}

function mapDispatchToProps(dispatch) {
  return {
   videoActions: bindActionCreators(VideoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);
