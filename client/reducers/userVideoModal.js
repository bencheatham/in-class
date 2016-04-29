import * as actions from '../constants/ActionTypes';

const initState = {
  visible: false
};

function userVideoModal(state=initState, action){
  switch(action.type) {
    case actions.USER_VIDEO_MODAL_SHOW:
      return { visible: true };
    case actions.USER_VIDEO_MODAL_HIDE:
      return { visible: false};
    default:
      return state;
  };
};

export default userVideoModal;
