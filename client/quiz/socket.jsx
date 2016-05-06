import { socket } from '../common/socket';
import axios from 'axios';

export function initializeWebSockets() {

  socket.on('pop-quiz', data => {
    console.log('downloading pop-quiz',data)
    this.props.actions.startQuiz(data.quiz);
  });
};

function emitQuiz(quiz){
  console.log('emit!')
  socket.emit('pop-quiz', {
      quiz: quiz,
    });
}


export function fetchQuiz(quizName){
  
  axios.get('/fetch', {params: {title: quizName}})
  .then(function(response){
    console.log(response);
    var downloadedQuiz = response.data; // we should modify the way we are sending answers
    emitQuiz(downloadedQuiz);
  })
  .catch(function(response){
    console.log('fetch error',response);
  }) 
}


