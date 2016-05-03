import React, { Component } from 'react';



export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    console.log('in props:   ')
    console.log(props)
    // this.changeSession = this.changeSession.bind(this);
    // this.appendIt = this.appendIt.bind(this);
    // this.login = this.login.bind(this);
    // this.makeCall = this.makeCall.bind(this);

  }


  appendIt(){
    console.log('IN APPEND IT CONTAINER')
        console.log((this.props.data.videoSession))
    if(this.props.data.videoSession){
     $('#vid-box').append(this.props.data.videoSession.outerHTML);
    }
  };


  // login(changeSession, makeCall, videoActions, props) {
  //   return new Promise(function(resolve, reject) {


  //     console.log('in video login: ', props);
  //     console.log(props.username);

  //     let utils = {};
  //     utils.props = props;
  //     utils.makeCall = makeCall;

  //     window.phone = PHONE({
  //         number        : props.username || "Anonymous", // listen on username line else Anonymous
  //         publish_key   : 'pub-c-566d8d42-99d0-4d21-bc72-6d376ed70567',
  //         subscribe_key : 'sub-c-107b4e72-082d-11e6-996b-0619f8945a4f',
  //         ssl : (('https:' == document.location.protocol) ? true : false),
  //         media : { audio : true, video : true }
  //     });

  //    let ctrl = window.ctrl = CONTROLLER(phone);

  //    // Called when ready to receive call
  //     ctrl.ready(function(){
  //    //   form.username.style.background="#55ff5b"; // Turn input green
  //     //  form.login_submit.hidden="true";  // Hide login button
  //    //   ctrl.addLocalStream(vid_thumb);   // Place local stream in div
  //     });        

  //     ctrl.receive(function(session){
  //         // if too many users on the line, than should not be able to connect

  //         session.connected(function(session){ 
  //      //     video_out.appendChild(session.video)
  //           console.log('INNNNN HERERERRERE');
  //           console.log(session.video);

  //           changeSession(session.video, videoActions);

  //         });
  //         session.ended(function(session) {
  //             changeSession(session.video, videoActions);

  //   //        ctrl.getVideoElement(session.number).remove(); 
  //         });

  //     });// Called on incoming call/call ended
  //     ctrl.videoToggled(function(session, isEnabled){
  //       ctrl.getVideoElement(session.number).toggle(isEnabled); // Hide video is stream paused
  //     });
      
  //     ctrl.audioToggled(function(session, isEnabled){
  //       ctrl.getVideoElement(session.number).css("opacity",isEnabled ? 1 : 0.75); // 0.75 opacity is audio muted
  //     });

  //     if (ctrl){
  //       resolve(utils)
  //     }

  //     });

  // }

  // changeSession(session, videoActions){
  //   console.log('WE ARE CHANGING SESSIONS!');
  //   console.log(session);
  //   if(session){
  //     videoActions.addVideoSession(session);
  //   }
  // }
  
  // makeCall(calledUser) {
  //   console.log('IN MAKE CALL, ', calledUser);
  //     if (!window.phone) alert("Login First!");
  //     else {
  //       console.log('dialing');
  //       phone.dial(calledUser);
  //     }
  // }
 
  // end(){
  //   console.log('in here!')
  //   ctrl.hangup();
  //   //phone.stop();
  //   window.phone = null;
  // }

  // mute(){
  //   var audio = ctrl.toggleAudio();
  //   // if (!audio) $("#mute").html("Unmute");
  //   // else $("#mute").html("Mute");
  // }

  // pause(){
  //   var video = ctrl.toggleVideo();
  //   // if (!video) $('#pause').html('Unpause');
  //   // else $('#pause').html('Pause');
  // }



  render() {
    console.log('In Render');
    console.log(this.props.data)
    //const props = this.props.data;

    // this.login(this.changeSession, this.makeCall, this.props.data.videoActions, this.props.data)
    //     .then(function(utils){
    //       console.log('it is a promise!!')
    //       console.log(utils.props)

    //       if (utils.props.calledUser !== null && utils.props.videoSession === null){
    //         console.log('oops HERERERRERE')
    //         console.log(ctrl)
    //         utils.makeCall(utils.props.calledUser);
    //       }


    // }).then(function(){
    //   console.log('CALL MADE')
    // })



    const videoSession = this.props.data.videoSession; 
   console.log('in video container')
    console.log(this.props)
    if (videoSession !== null && videoSession !== undefined){
      this.appendIt();
    }


   return (
         <div id="vid-box">

         </div>


  );
 }
}