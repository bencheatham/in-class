import * as type from './constants';

export function submitThumb(){
  return {
    type: type.THUMB_SUBMITTED,
  }
}

export function thumbCheck(){
  return {
    type: type.THUMB_CHECK,
  }
}

export function openModal(){
  return {
    type: type.OPEN_MODAL,
  }
}

export function hideModal(){
  return {
    type: type.HIDE_MODAL,
  }
}

export function beginThumbCheck () {
  return {
    type: type.BEGIN_THUMBCHECK,
  }
}
