import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  users: [],
  editAudio: null,
  loading: false
};

const startLoading = (state, action) => {
  return updateObject(state, {
    loading: true
  })
};

const setUsers = (state, action) => {
  return updateObject(state, {
    users: action.users,
    loading: false
  })
};

// удалить пользователя
const filterUser = (state, action) => {
  const updatedUsers = state.users.filter(user => {
    return user._id !== action.userId
  });
  return updateObject(state, {
    users: updatedUsers,
    loading: false
  })
};

// загрузить информацию о редактируемом аудио
const editAudio = (state, action) => {
  return updateObject(state, {
    editAudio: action.audioData
  })
};

// очистить информацию о редактируемом аудио
const editAudioClean = (state, action) => {
  return updateObject(state, {
    editAudio: null
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_LOADING_START: return startLoading(state, action);
    case actionTypes.ADMIN_SET_USERS: return setUsers(state, action);
    case actionTypes.ADMIN_FILTER_USER: return filterUser(state, action);
    case actionTypes.ADMIN_SET_EDIT_AUDIO: return editAudio(state, action);
    case actionTypes.ADMIN_CLEAN_EDIT_AUDIO: return editAudioClean(state, action);
    default: return state;
  }
};

export default reducer;