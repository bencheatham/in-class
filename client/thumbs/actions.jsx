import { THUMB_CHECK, THUMB_SUBMITTED } from './constants';

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
