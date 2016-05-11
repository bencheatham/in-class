function appendVideo(session) {
  document.getElementById("vid-box").appendChild(session.video);
  this.props.videoActions.setControllerVisibility(true);
};

function removeVideo() {
  $('#vid-box').html('');
  this.props.videoActions.setControllerVisibility(false);
};

export function login(username) {

  let appendVideo = this.appendVideo.bind(this);
  let removeVideo = this.removeVideo.bind(this);

  window.phone = PHONE({
      number        : username || "Anonymous", // listen on username line else Anonymous
      publish_key   : 'pub-c-566d8d42-99d0-4d21-bc72-6d376ed70567',
      subscribe_key : 'sub-c-107b4e72-082d-11e6-996b-0619f8945a4f',
      ssl : (('https:' == document.location.protocol) ? true : false)
  });

  window.phone.ready(function(){ });

  // receives phone conversation back from PubNub
  window.phone.receive(function(session){
    session.connected(function(session) {
      console.log('hit connected');
      appendVideo(session);
    });

    session.ended(function(session) {
      console.log('hit ended');
      removeVideo(session);
    });
  });
};


export function makeCall(user) {
  if (!window.phone) {
    alert("Login First!");
  }
  window.phone.dial(user);
};

export function end() {
  window.phone.hangup();
  window.phone = null;
}
