import { socket } from '../common/socket';

export function initializeWebSockets() {

  socket.on('pop-quiz', data => {
    console.log(data);

    this.props.actions.startQuiz('Quiz2');
  });
};

export function emitQuiz(quizName){
  console.log('emit!')
  socket.emit('pop-quiz', {
      file: quizName
    });
}

