import { QUIZ_ACCEPT, QUIZ_REJECT } from '../constants/ActionTypes'


exports default function answer(action) {

  switch (action) {
    case QUIZ_ACCEPT:
    case QUIZ_REJECT:
    default:
      conosole.log('at reducer');
  }
}
