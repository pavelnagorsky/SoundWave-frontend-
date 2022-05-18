import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  audios: [],
  total: null,
  loading: false,
  error: false
};

const fetchAudiosStart = (state, action) => {
  return updateObject(state, { 
    loading: true,
    error: false
  });
}

const setAudios = (state, action) => {
  return updateObject(state, {
    audios: action.audios,
    total: action.total,
    error: false,
    loading: false
  });
};

const fetchAudiosFailed = (state, action) => {
  return updateObject(state, {
    audios: [],
    error: true,
    loading: false
  });
};

// изменить состояние лайка на кокретном аудио
const changeLike = (state, action) => {
  // находим данное аудио в массиве стэйта, 
  // далее в зависимости от action.add (лайк потсавлен или убран),
  // обновляем счетчик лайков для аудио
  const updatedAudios = state.audios.map(audio => {
    if (audio._id === action.audioId) {
      if (action.add) {
        return updateObject(audio, {
          likes: audio.likes += 1
        })
      } else {
        return updateObject(audio, {
          likes: audio.likes -= 1
        })
      };
    } else {
      return audio;
    }
  });
  return updateObject(state, { 
    audios: updatedAudios
  });
};

// удаление аудио из стейта 
export const filterAudio = (state, action) => {
  // фильтруем массив аудио по id удаленного
  const updatedAudios = state.audios.filter(audio => {
    return audio._id !== action.audioId
  });
  return updateObject(state, { 
    audios: updatedAudios
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUDIOS: return setAudios(state, action);
    case actionTypes.FETCH_AUDIOS_START: return fetchAudiosStart(state, action);
    case actionTypes.FETCH_AUDIOS_FAILED: return fetchAudiosFailed(state, action);
    case actionTypes.CHANGE_LIKE: return changeLike(state, action);
    case actionTypes.FILTER_AUDIO: return filterAudio(state, action);
    default: return state;
  }
}

export default reducer;