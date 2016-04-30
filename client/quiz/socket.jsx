import { socket } from '../common/socket';
import { storePopQuiz } from './actions';

export function initializeWebSockets() {
  socket.on('pop-quiz', data => {
    this.props.actions.storePopQuiz(data);
  });
};

export function emitQuiz(quizName){
  socket.emit('pop-quiz', {
      file: quizName
    });
}

