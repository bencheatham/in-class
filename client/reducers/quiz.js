function quiz(state = { value: false}, action) { // action = {type: QUIZ_ACCEPT }
  const { type, error } = action;
  switch (type) {
    case 'QUIZ_ACCEPT':
      return { value : true};
    case 'QUIZ_REJECT':
      return { value : false}; 
    default:
      return state;
  }
}

export default quiz;
