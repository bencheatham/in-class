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

  appendIt(){
    console.log('IN APPEND IT')
        console.log((this.props.videoSession))
    if(this.props.videoSession){
     $('#vid-box').append(this.props.videoSession.outerHTML);
    }
  };
 
  login(changeSession, videoActions) {
    
    console.log('in video login: ', this.props);
    console.log(this.props.changeSession);

    window.phone = PHONE({
        number        : this.props.username || "Anonymous", // listen on username line else Anonymous
        publish_key   : 'pub-c-566d8d42-99d0-4d21-bc72-6d376ed70567',
        subscribe_key : 'sub-c-107b4e72-082d-11e6-996b-0619f8945a4f',
        ssl : (('https:' == document.location.protocol) ? true : false)
    });

    phone.ready(function(){ 
      //form.username.style.background="#55ff5b";
    });

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

  render() {

    console.log('In Render');

    this.login(this.changeSession, this.props.videoActions);


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
      this.appendIt();
      if (this.props.teacherCall) {

        console.log('Time to Experiment: ')
        console.log(this.props.videoSession)

        // let vid = this.props.videoSession.outerHTML;
        // console.log(vid);
        // console.log(typeof vid);
        // let vid2 = $(vid)[0];
        // console.log(vid2);

        let stringVideoSession = Object.assign({}, this.props.videSession, {
          session: this.props.videoSession.outerHTML
        });

        console.log(stringVideoSession.session);


        let classVideoPac = {
          speaker: this.props.calledUser,
          teacher: this.props.teacherName,
          videoSession: stringVideoSession.session
        }
          
        console.log(classVideoPac);
        //this.props.videoActions.emitTeacherVideoSession(classVideoPac);
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





