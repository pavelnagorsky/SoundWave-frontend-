import * as actionTypes from './actionTypes';

// начало процесса получения аудио с сервера
export const fetchAudiosStart = () => {
  return {
    type: actionTypes.FETCH_AUDIOS_START
  }
};

// запрос на получение аудио
export const fetchAudios = url => {
  return {
    type: actionTypes.FETCH_AUDIOS,
    url: url
  }
};

// передача аудио в стейт
export const setAudios = (audios, total) => {
  return {
    type: actionTypes.SET_AUDIOS,
    audios: audios,
    total: total
  }
};

// ошибка при получении аудио
export const fetchAudiosFailed = () => {
  return {
    type: actionTypes.FETCH_AUDIOS_FAILED
  }
};

// добавить или убрать лайк на сервере
export const sendLikeInfo = (audioId, add) => {
  return {
    type: actionTypes.SEND_LIKE_INFO,
    audioId: audioId,
    add: add
  }
};

// добавить или убрать лайк в стейте
export const changeLike = (audioId, add) => {
  return {
    type: actionTypes.CHANGE_LIKE,
    audioId: audioId,
    add: add
  }
};

// поиск аудио 
export const searchAudio = (query, page) => {
  return {
    type: actionTypes.AUDIO_SEARCH,
    query: query,
    page: page
  }
};

// отправка на сервер информации о прослушивании аудио
export const increasePlays = id => {
  return {
    type: actionTypes.INCREASE_PLAYS,
    id: id
  }
};

// получение одного аудио с полной информацией
export const fetchAudio = audioId => {
  return {
    type: actionTypes.FETCH_AUDIO,
    audioId: audioId
  }
};

// начало процесса получения одного аудио с сервера
export const fetchAudioStart = () => {
  return {
    type: actionTypes.FETCH_AUDIO_START
  }
};

// передача одного аудио в стейт
export const setAudio = audio => {
  return {
    type: actionTypes.SET_AUDIO,
    audio: audio
  }
};

// ошибка при получении одного аудио
export const fetchAudioFailed = () => {
  return {
    type: actionTypes.FETCH_AUDIO_FAILED
  }
};

// очистить полную информацию о конкретном аудио
export const clearAudioData = () => {
  return {
    type: actionTypes.CLEAR_AUDIO_DATA
  }
};

// удаление аудио из стэйта
// вызывается при удалении аудио из плейлиста пользователя,
// чтобы тут же убрать из списка для прослушивания
export const filterAudio = audioId => {
  return {
    type: actionTypes.FILTER_AUDIO,
    audioId: audioId
  }
};

// запрос на скачивание аудио
export const downloadAudio = (audioId, filename) => {
  return {
    type: actionTypes.DOWNLOAD_AUDIO,
    audioId: audioId,
    filename: filename
  }
};