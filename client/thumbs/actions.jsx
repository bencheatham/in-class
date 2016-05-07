import { HIDE_MODAL, BEGIN_THUMBCHECK, THUMB_CHECK, THUMB_SUBMITTED } from './constants';

export function submitThumb(){
  return {
    type: THUMB_SUBMITTED,
  }
}

export function thumbCheck(){
  return {
    type: THUMB_CHECK,
  }
}

export function hideModal(){
  return {
    type: HIDE_MODAL,
  }
}

export function beginThumbCheck () {
  return {
    type: BEGIN_THUMBCHECK,
  }
}
