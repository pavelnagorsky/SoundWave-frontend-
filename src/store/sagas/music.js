import { put } from 'redux-saga/effects';

import axios from "../../axiosInstances/axiosInstance";
import axiosAuth from '../../axiosInstances/axiosInstanceAuth';
import {
  fetchAudiosStart,
  fetchAudiosFailed,
  setAudios,
  fetchAudioStart,
  setAudio,
  fetchAudioFailed,
  updateUserLikes,
  changeLike
} from '../actions/index';

// получение аудиозаписей с сервера
export function* fetchAudiosSaga (action) {
  yield put(fetchAudiosStart());
  try {
    const response = yield axios.get(`/audios${action.url}`);
    const audios = response.data.audios;
    const totalAudios = response.data.totalAudios;
    yield put(setAudios(audios, totalAudios));
  }
  catch(error) {
    yield put(fetchAudiosFailed())
  }
};

// получение одной аудиозаписи с сервера
export function* fetchAudioSaga (action) {
  yield put(fetchAudioStart());
  try {
    const response = yield axios.get(`/audios/${action.audioId}`);
    const audio = response.data.audio;
    yield put(setAudio(audio));
  }
  catch(error) {
    yield put(fetchAudioFailed());
  }
};

// нажатие кнопки лайка
export function* sendLikeInfoSaga (action) {
  try {
    // обновляем массив лайков данного пользователя
    yield put(updateUserLikes(action.audioId, action.add));
    // обновляем счетчик лайков у аудиозаписи
    yield put(changeLike(action.audioId, action.add));
    // отправляем данные на сервер
    const likeInfo = {
      add: action.add // добавить или убрать лайк
    };
    yield axiosAuth.patch(`/audios/${action.audioId}/like`, likeInfo);
  }
  catch(error) {
    // console.log(error)
  }
};

// волшебный поиск аудио
export function* searchAudioSaga (action) {
  yield put(fetchAudiosStart());
  try {
    const response = yield axios
      .post(`/audios/search?page=${action.page}`, { searchQuery: action.query });
    const totalAudios = response.data.totalAudios;
    yield put(setAudios(response.data.audios, totalAudios));
  } catch {
    // console.log(error)
  }
};

// обновление числа прослушиваний
export function* increasePlaysSaga (action) {
  try {
    yield axios.patch(`/audios/${action.id}/plays`);
  } catch (err) {
    // console.log(err)
  }
};

// скачивание аудиозаписи
export function* downloadAudioSaga (action) {
  try {
    const response = yield axios.get(`/audios/${action.audioId}/download`, {
      responseType: 'blob',
      responseEncoding: "utf8",
      headers: {
        "Content-Type": "audio/mpeg"
      }
    });
    // создание невидимой ссылки на скачивание файла
    const fileUrl = window.URL.createObjectURL(response.data);
    const link = document.createElement('a');   
    link.href = fileUrl;    
    link.setAttribute('download', action.filename);    
    document.body.appendChild(link);  
    // начало скачивания  
    link.click();
    // удаление ссылки на скачивание
    link.remove()
  } catch (err) {
    // console.log(err)
  }
};