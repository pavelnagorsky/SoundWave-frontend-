import * as actionTypes from './actionTypes';

export const setCurrentPlay = audio => {
  return {
    type: actionTypes.SET_CURRENT_PLAY,
    audio: audio
  }
};

export const setPrevPlay = audio => {
  return {
    type: actionTypes.SET_PREV_PLAY,
    audio: audio
  }
};

export const setNextPlay = audio => {
  return {
    type: actionTypes.SET_NEXT_PLAY,
    audio: audio
  }
};

export const closePlayer = () => {
  return {
    type: actionTypes.CLOSE_PLAYER
  }
};