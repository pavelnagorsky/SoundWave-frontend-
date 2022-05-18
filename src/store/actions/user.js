import * as actionTypes from './actionTypes';

// запрос на получение данных о пользователе
export const getUserData = userId => {
  return {
    type: actionTypes.USER_GET_DATA,
    userId: userId
  }
};

// начало загрузки данных
export const getUserDataStart = () => {
  return {
    type: actionTypes.USER_GET_DATA_START
  }
};

// добавление инфо о пользователе в стэйт
export const getUserDataSuccess = userData => {
  return {
    type: actionTypes.USER_GET_DATA_SUCCESS,
    userData: userData
  }
};

// ошибка получения данных о пользователе
export const getUserDataFail = () => {
  return {
    type: actionTypes.USER_GET_DATA_FAIL
  }
};

// изменение информации о пользователе
export const sendUserData = userData => {
  return {
    type: actionTypes.USER_SEND_DATA,
    userData: userData
  }
};

// изменение в стэйте обновленных данных пользователя
export const setChangedUserData = (newName, newProfileImage) => {
  return {
    type: actionTypes.USER_SET_CHANGED_DATA,
    newName: newName,
    newProfileImage: newProfileImage
  }
};

// очистка информации о пользователе после логаута
export const cleanUserData = () => {
  return {
    type: actionTypes.USER_CLEAN_DATA
  }
};

// обновление отметки нравится от данного пользователя для данного аудио
export const updateUserLikes = (audioId, add) => {
  return {
    type: actionTypes.USER_UPDATE_LIKES,
    audioId: audioId,
    add: add
  }
};

// добавление нового плейлиста
export const addPlaylist = (userId, playlistTitle) => {
  return {
    type: actionTypes.USER_ADD_PLAYLIST,
    userId: userId,
    playlistTitle: playlistTitle
  }
};

// начало создания добавления плейлиста
export const addPlaylistStart = () => {
  return {
    type: actionTypes.USER_ADD_PLAYLIST_START
  }
};

// успешное добавления нового плейлиста в стейт
export const addPlaylistSuccess = playlist => {
  return {
    type: actionTypes.USER_ADD_PLAYLIST_SUCCESS,
    playlist: playlist
  }
};

// добавление аудио в плейлист пользователя на сервер
export const addToPlaylist = (audioId, userId, playlistId) => {
  return {
    type: actionTypes.USER_ADD_AUDIO_TO_PLAYLIST,
    audioId: audioId,
    userId: userId,
    playlistId: playlistId
  }
};

// добавление аудио в плейлист пользователя в стейте
export const addToPlaylistSuccess = (audioId, playlistId) => {
  return {
    type: actionTypes.USER_SET_AUDIO_TO_PLAYLIST,
    audioId: audioId,
    playlistId: playlistId
  }
};

// загрузка плейлиста пользователя
export const loadPlaylist = (userId, playlistId) => {
  return {
    type: actionTypes.USER_LOAD_PLAYLIST,
    userId: userId,
    playlistId: playlistId
  }
};

// удаление плейлиста на сервере
export const deletePlaylist = (userId, playlistId) => {
  return {
    type: actionTypes.USER_DELETE_PLAYLIST,
    userId: userId,
    playlistId: playlistId
  }
};

// удаление плейлиста из стейта
export const filterPlaylists = deletedPlaylistId => {
  return {
    type: actionTypes.USER_FILTER_PLAYLISTS,
    deletedPlaylistId: deletedPlaylistId
  }
};

// удаление аудио из плейлиста на сервере
export const deleteAudioFromPlaylist = (userId, playlistId, audioId) => {
  return {
    type: actionTypes.USER_DELETE_AUDIO_FROM_PLAYLIST,
    userId: userId,
    playlistId: playlistId,
    audioId: audioId
  }
};

// удаление аудио из плейлиста в стейте
export const filterPlaylist = (playlistId, deletedAudioId) => {
  return {
    type: actionTypes.USER_FILTER_PLAYLIST,
    playlistId: playlistId,
    deletedAudioId: deletedAudioId
  }
};