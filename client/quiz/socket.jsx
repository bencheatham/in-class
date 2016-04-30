import { socket } from '../common/socket';
import { storePopQuiz } from './actions';

export function initializeWebSockets() {
  socket.on('pop-quiz', data => {
    this.props.actions.storePopQuiz(data);
  });
};

// export function emitNewQuestion(event,name){
//   socket.emit('question-submitted', {
//       username : name,
//       text: event.target.value,
//       timestamp: Date.now(),
//       upvotes: [],
//     });
// }

