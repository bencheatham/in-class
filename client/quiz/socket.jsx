import axios from 'axios';
import { connectToWebSockets } from '../common/socket';

var socket;

export function initializeWebSockets() {
  socket = connectToWebSockets();

  socket.on('pop-quiz', data => {
    console.log('pop-quiz event');
    this.props.quizActions.storePopQuiz(data.quiz);
  });
};

export function closeWebSockets(){
  socket.disconnect();
}

function emitQuiz(quiz,username){
   socket.emit('pop-quiz', {
      quiz: quiz,
      teachername: username,
    });
}

export function fetchQuiz(quizName,username){
  axios.get('/fetch', {params: {title: quizName}})
  .then(function(response){
    var downloadedQuiz = response.data; // we should modify the way we are sending answers
    emitQuiz(downloadedQuiz, username);
  })
  .catch(function(response){
    console.log('fetch error',response);
  })
}
