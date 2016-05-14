
/*globals io*/

var socket;


function start (type) {
  if (type === 'chat') { return chat(); }
  if (type === 'questions') { return questions(); }
  if (type === 'thumbs') { return thumbs(); }

  throw 'incorrect type argument';
}


var users = ['Sandy', 'Pablo', 'Jimmy', 'Melissa', 'Oliver'];

var questionsArray = [
  'What were the biggest challenges of the project?',
  'Why did you choose to built out this application in React?',
  'Why did you choose a relational database?',
  'If you had more time, what features would you build out and why?'
];


var chatArray = [
  'Wow, this project is great… Have they discussed their tech stack yet?',
  'It looks like they are using websockets! How neat… I wonder if they used socket.io…',
  'I can’t wait to see that video feature. I’ve always wanted to build something like that.',
  'Does anyone know the location of their repository on github.com?',
  'Yes, its www.github.com/In-Class/in-class.'
];



function chat () {
  socket = connectToWebSockets();
  function chatRecurse (count) {
    count = count ? count : 0;
    submitMessage(chatArray[count], users[users.length-1-count]);
    if (count < chatArray.length - 1) {
      setTimeout(function () { chatRecurse(++count); }, Math.random() * 3000);
    }  
    else {
      console.log('chat done!');
      disconnectFromWebSocket();
    }
  }
  chatRecurse();
}

function questions () {
  
  socket = connectToWebSockets();
  function questionsRecurse (count) {
    count = count ? count : 0;
    submitQuestion(questionsArray[count], users[count]);
    if (count < questionsArray.length - 1) {
      setTimeout(function () { questionsRecurse(++count); }, Math.random() * 3000);
    }  
    else {
      console.log('questions done!');
      upVoteRecurse();
    }
  }
  function upVoteRecurse (count) {
    count = count ? count : 0;
    var index = Math.floor(Math.random()*questionsArray.length);
    submitUpVote(index);
    if (count < 10) {
      setTimeout(function () { upVoteRecurse(++count); }, Math.random() * 2000);
    }  
    else {
      console.log('upvote done!');
      disconnectFromWebSocket();
    }
  }


  questionsRecurse();
  // upVoteRecurse();



}

var thumbTypes = ['up', 'up', 'up', 'up', 'neutral', 'neutral', 'neutral', 'down'];
function thumbs () {
  socket = connectToWebSockets();
  function thumbsRecurse (count) {
    count = count ? count : 0;
    for (var i = 0; i < Math.floor(Math.random() * 6); i++ ) {  
      var type = thumbTypes[Math.floor(Math.random() * thumbTypes.length)];
      submitThumbs(type, 'user');
      console.log(type);
    }

    if (count < 30) {
      setTimeout(function () { thumbsRecurse(++count); }, Math.random() * 200);
    }
    else {
      console.log('thumbs done!');
      disconnectFromWebSocket();
    }
  }
  thumbsRecurse();
}


var userId = (function () {
  var id = 0;
  return function () { return id++; };
})();


function wipeQuestions(){
  socket = connectToWebSockets();
  socket.emit('wipe-questions',{});
  // disconnectFromWebSocket();
}

function wipeChat(){
  socket = connectToWebSockets();
  socket.emit('wipe-chat',{});
  // disconnectFromWebSocket();
}





function submitMessage (message, name) { emitChatMessage(message, name); } 


function submitQuestion (question, name) { emitNewQuestion(question, name); }
function submitUpVote (index) { emitUpvote(index, userId()); }


function submitThumbs (type) { emitThumbEvent(type, 'user'); }







function connectToWebSockets(){ return io().connect('http://localhost:8000'); }
// function connectToWebSockets(){ return io().connect('https://in-class.herokuapp.com'); }
function disconnectFromWebSocket (){ socket.disconnect(); }

function emitChatMessage(text,name){
  socket.emit('chatMessage-submitted', {
      username : name,
      text: text,
      timestamp: Date.now(),
    });
}

function emitNewQuestion(text,name){
  socket.emit('question-submitted', {
      username : name,
      text: text,
      timestamp: Date.now(),
      upvotes: [],
    });
}

function emitUpvote(id,username){
  socket.emit('upvote', {id: id, username: username});
}

function emitThumbEvent(value,name, id){
  socket = connectToWebSockets();
  
  socket.emit('thumb-student', {
      username : name,
      thumb: value,
      timestamp: Date.now(),
      id: id,
    });
}
