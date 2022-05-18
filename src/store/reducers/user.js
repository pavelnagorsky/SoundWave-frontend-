import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  name: null,
  profileImage: null,
  isAdmin: false,
  likes: [],
  playlists: [],
  playlistLoading: false,
  loading: false,
  error: false
};

// начало загрузки иформации о пользователе
const getUserDataStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: false
  })
};

const getUserDataSuccess = (state, action) => {
  return updateObject(state, {
    name: action.userData.name,
    profileImage: action.userData.profileImage,
    isAdmin: action.userData.isAdmin,
    likes: action.userData.likes,
    playlists: action.userData.playlists,
    playlistLoading: false,
    loading: false,
    error: false
  });
};

const getUserDataFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: true
  })
};

// обновление измененных данных о пользователе, если они есть
const setChangedUserData = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: false,
    name: action.newName !== null ? action.newName : state.name,
    profileImage: action.newProfileImage !== null ? action.newProfileImage : state.profileImage
  })
};

const updateUserLikes = (state, action) => {
  if (action.add) {
    return updateObject(state, {
      likes: state.likes.concat(action.audioId)
    })
  } else {
    return updateObject(state, {
      likes: state.likes.filter(audioId => audioId !== action.audioId)
    })
  }
};

const addNewPlaylistStart = (state, action) => {
  return updateObject(state, {
    playlistLoading: true
  })
}

const setNewPlaylist = (state, action) => {
  return updateObject(state, {
    playlistLoading: false,
    playlists: [action.playlist, ...state.playlists]
  })
};

// добавление нового аудио в плейлист
const setAudioToPlaylist = (state, action) => {
  const playlistId = action.playlistId;
  const audioId = action.audioId;
  const playlistIndex = state.playlists.findIndex(pl => {
    return pl._id === playlistId
  });
  const foundPlaylist = state.playlists[playlistIndex];
  const updatedPlaylist = foundPlaylist;
  // если аудио уже было добавлено в плейлист, то убираем его.
  updatedPlaylist.music = foundPlaylist.music.filter(id => {
    return id !== audioId
  });
  // обновляем время изменения плейлиста
  updatedPlaylist.updatedAt = new Date();
  // добавляем аудио в начало плейлиста 
  updatedPlaylist.music.unshift(audioId);
  // обновляем плейлисты
  const updatedPlaylists = [...state.playlists];
  updatedPlaylists[playlistIndex] = updatedPlaylist;
  return updateObject(state, {
    playlists: updatedPlaylists
  })
};

// удаление аудио из плейлиста пользователя
const filterPlaylist = (state, action) => {
  // находим индекс редактируемого плейлиста
  const playlistIndex = state.playlists.findIndex(playlist => {
    return playlist._id === action.playlistId
  });
  // создаем копию редактируемого плейлиста
  const updatedPlaylist = state.playlists[playlistIndex];
  // фильтруем его на предмет удаленного аудио
  updatedPlaylist.music = updatedPlaylist.music.filter(audioId => {
    return audioId !== action.deletedAudioId
  });
  // создаем копию массива всех плейлистов 
  const updatedPlaylists = [...state.playlists];
  // обновляем отредактированный плейлист
  updatedPlaylists[playlistIndex] = updatedPlaylist;
  return updateObject(state, {
    playlists: updatedPlaylists
  });
};

// удаление плейлиста из стейта
const filterPlaylists = (state, action) => {
  // фильтрация массива плейлистов
  const updatedPlaylists = state.playlists.filter(playlist => {
    return playlist._id !== action.deletedPlaylistId
  });
  return updateObject(state, {
    playlists: updatedPlaylists
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_GET_DATA_START: return getUserDataStart(state, action);
    case actionTypes.USER_GET_DATA_SUCCESS: return getUserDataSuccess(state, action);
    case actionTypes.USER_GET_DATA_FAIL: return getUserDataFailed(state, action);
    case actionTypes.USER_SET_CHANGED_DATA: return setChangedUserData(state, action);
    case actionTypes.USER_CLEAN_DATA: return initialState;
    case actionTypes.USER_UPDATE_LIKES: return updateUserLikes(state, action);
    case actionTypes.USER_ADD_PLAYLIST_START: return addNewPlaylistStart(state, action);
    case actionTypes.USER_ADD_PLAYLIST_SUCCESS: return setNewPlaylist(state, action);
    case actionTypes.USER_SET_AUDIO_TO_PLAYLIST: return setAudioToPlaylist(state, action);
    case actionTypes.USER_FILTER_PLAYLISTS: return filterPlaylists(state, action);
    case actionTypes.USER_FILTER_PLAYLIST: return filterPlaylist(state, action);
    default: return state;
  }
};

export default reducer;