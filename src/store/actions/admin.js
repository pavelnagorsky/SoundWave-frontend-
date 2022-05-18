import * as actionTypes from './actionTypes';

// начало загрузки данных 
export const adminLoadingStart = () => {
  return {
    type: actionTypes.ADMIN_LOADING_START
  }
};

// получение пользователей, не являющихся администраторами
export const adminGetUsers = () => {
  return {
    type: actionTypes.ADMIN_GET_USERS
  }
};

// добавление пользователей в стэйт
export const adminSetUsers = users => {
  return {
    type: actionTypes.ADMIN_SET_USERS,
    users: users
  }
};

// сделать пользователя админом
export const adminRaiseUser = userId => {
  return {
    type: actionTypes.ADMIN_RAISE_USER,
    userId: userId
  }
};

// блокировка пользователя
export const adminBlockUser = userId => {
  return {
    type: actionTypes.ADMIN_BLOCK_USER,
    userId: userId
  }
};

// удаление пользователя из стейта
export const adminFilterUser = userId => {
  return {
    type: actionTypes.ADMIN_FILTER_USER,
    userId: userId
  }
};

// добавление нового аудио
export const adminNewAudio = audioData => {
  return {
    type: actionTypes.ADMIN_NEW_AUDIO,
    audioData: audioData
  }
};

// редактирование аудио
export const adminEditAudio = (id, audioData) => {
  return {
    type: actionTypes.ADMIN_EDIT_AUDIO,
    id: id,
    audioData: audioData
  }
};

// удаление аудио
export const adminDeleteAudio = id => {
  return {
    type: actionTypes.ADMIN_DELETE_AUDIO,
    id: id
  }
};

// включить режим редактирования аудио
export const adminEditAudioMode = audioData => {
  return {
    type: actionTypes.ADMIN_SET_EDIT_AUDIO,
    audioData: audioData
  }
};

// выключить режим редактирования аудио
export const adminEditAudioModeClose = () => {
  return {
    type: actionTypes.ADMIN_CLEAN_EDIT_AUDIO
  }
};