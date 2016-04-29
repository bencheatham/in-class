import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


export default class VideoContainer extends Component {

   constructor(props) {
    super(props);

    this.state = { 
     videoSession: '',
     phone: window.phone,
     calledUser: ''
    };

    this.changeSession = this.changeSession.bind(this);
    this.appendIt = this.appendIt.bind(this);

   }


  appendIt(){
    console.log('IN APPEND IT')
        console.log((this.state.videoSession.src))

     $('#vid-box').append(this.state.videoSession.outerHTML);
  };
 


  login(user, changeSession) {

    console.log('in video login: ', user);


    window.phone = PHONE({
        number        : user || "Anonymous", // listen on username line else Anonymous
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
          console.log(this)

          changeSession(session.video);

          });

          //this.setState({ videoSession: session.video});});
        session.ended(function(session) {
          
          changeSession(session.video);

         // this.setState({ videoSession: ''});

        });
    });

    //return false;   // So the form does not submit.
  }

  changeSession(session, appendIt){
    console.log('WE ARE CHANGING SESSIONS!')
    console.log(session)
    {this.setState({ videoSession: session })}


  }
  
  makeCall(form) {
    if (!window.phone) alert("Login First!");
    else phone.dial("Fred");
  }

  render() {
    console.log('DURRRRRR', this.changeSession)

    this.login(this.props.username, this.changeSession);

    this.appendIt();

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






