import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  audio: null,
  loading: false,
  error: false
};

const fetchAudioStart = (state, action) => {
  return updateObject(state, { 
    loading: true,
    error: false
  });
}

const setAudio = (state, action) => {
  return updateObject(state, {
    audio: action.audio,
    error: false,
    loading: false
  });
};

const fetchAudioFailed = (state, action) => {
  return updateObject(state, {
    audio: null,
    error: true,
    loading: false
  });
};

const addComment = (state, action) => {
  const updatedAudio = updateObject(state.audio, {
    comments: [action.comment, ...state.audio.comments]
  });
  return updateObject(state, {
    audio: updatedAudio
  });
};

const updateComment = (state, action) => {
  const updatedCommentIndex = state.audio.comments.findIndex(c => {
    return c._id === action.comment._id
  });
  const updatedComments = [...state.audio.comments];
  updatedComments[updatedCommentIndex] = action.comment;
  const updatedAudio = updateObject(state.audio, {
    comments: updatedComments
  });
  return updateObject(state, {
    audio: updatedAudio
  });
};

const removeComment = (state, action) => {
  const updatedComments = state.audio.comments.filter(c => {
    return c._id.toString() !== action.commentId.toString()
  });
  const updatedAudio = updateObject(state.audio, {
    comments: updatedComments
  });
  return updateObject(state, {
    audio: updatedAudio
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUDIO: return setAudio(state, action);
    case actionTypes.FETCH_AUDIO_START: return fetchAudioStart(state, action);
    case actionTypes.FETCH_AUDIO_FAILED: return fetchAudioFailed(state, action);
    case actionTypes.CLEAR_AUDIO_DATA: return initialState;
    case actionTypes.SET_COMMENT: return addComment(state, action);
    case actionTypes.SET_UPDATED_COMMENT: return updateComment(state, action);
    case actionTypes.REMOVE_DELETED_COMMENT: return removeComment(state, action);
    default: return state;
  }
};

export default reducer;