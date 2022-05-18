import * as actionTypes from '../actions/actionTypes';

const initialState = {
  artist: '',
  title: '',
  src: '',
  isPlaying: false,
  index: null,
  id: null
};

const setCurrentPlay = (state, action) => {
  return {
    ...action.audio
  };
};

const setPrevPlay = (state, action) => {
  return {
    ...action.audio
  };
};

const setNextPlay = (state, action) => {
  return {
    ...action.audio
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_PLAY: return setCurrentPlay(state, action);
    case actionTypes.SET_PREV_PLAY: return setPrevPlay(state, action);
    case actionTypes.SET_NEXT_PLAY: return setNextPlay(state, action);
    case actionTypes.CLOSE_PLAYER: return initialState;
    default: return state;
  }
}

export default reducer;