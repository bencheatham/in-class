import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as VideoActions from '../../../modules/video/actions';

class VideoContainer extends Component {

   constructor(props) {
    super(props);

    this.state = { 
//     videoSession: '',
     phone: window.phone,
     calledUser: ''
    };

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

      console.log(this.props.changeSession)

  //  if(this.props.callingUser !== null){

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

              console.log('INNNNN HERERERRERE')
              console.log(session.video)

              changeSession(session.video, videoActions);

              });

              //this.setState({ videoSession: session.video});});
            session.ended(function(session) {
              
              changeSession(session.video, videoActions);

             // this.setState({ videoSession: ''});

            });
        });
 //   }

    //return false;   // So the form does not submit.
  }

  changeSession(session, videoActions){
    console.log('WE ARE CHANGING SESSIONS!')
    console.log(session)
    videoActions.addVideoSession(session)
//    {this.setState({ videoSession: session })}


  }
  
  makeCall() {
    console.log('IN MAKE CALL, ', this.props.calledUser)
 //   if(this.props.calledUser !== null){
      if (!window.phone) alert("Login First!");
      else {
        console.log('dialing')
        phone.dial(this.props.calledUser);
      }

//    }
  }

  render() {

    console.log('In Render');
  //  if(this.props.calledUser !== null){
      this.login(this.changeSession, this.props.videoActions);
  //  }

    if(this.props.calledUser !== null){
      setTimeout(this.makeCall, 3000);
    }
    if(this.props.videoSession !== null){
      this.appendIt();
    }

    // setTimeout(this.makeCall, 10000);

    // setTimeout(this.appendIt, 30000);

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
    videoSession: state.video.videoSession
  };
}

function mapDispatchToProps(dispatch) {
  return {
   videoActions: bindActionCreators(VideoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);





