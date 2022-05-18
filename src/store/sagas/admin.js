import { put } from 'redux-saga/effects';

import axios from "../../axiosInstances/axiosInstanceAuth";
import { 
  adminLoadingStart,
  adminSetUsers,
  adminFilterUser
} from '../actions/index';

// получение всех пользователей, не являющихся администраторами
export function* adminGetUsersSaga (action) {
  yield put(adminLoadingStart());
  try {
    const response = yield axios.get('/admin/users');
    yield put(adminSetUsers(response.data.users));
  } catch (err) {
    // console.log(err)
  }
};

// сделать пользователя администратором
export function* adminRaiseUserSaga (action) {
  yield put(adminLoadingStart());
  try {
    const response = yield axios.patch(`/admin/users/${action.userId}`);
    yield put(adminFilterUser(response.data.id));
  } catch (err) {
    // console.log(err)
  }
};

// удаление пользователя
export function* adminBlockUserSaga (action) {
  yield put(adminLoadingStart());
  try {
    const response = yield axios.delete(`/admin/users/${action.userId}`);
    yield put(adminFilterUser(response.data.id));
  } catch (err) {
    // console.log(err)
  }
};

// добавление нового аудио
export function* adminNewAudioSaga (action) {
  const audioData = action.audioData;
  const formData = new FormData();
  formData.append('title', audioData.title);
  formData.append('artist', audioData.artist);
  formData.append('description', audioData.description);
  formData.append('imageUrl', audioData.imageUrl);
  formData.append('audio', audioData.audio);
  formData.append('category', audioData.category);
  try {
    yield axios.post('/admin/audios', formData);
  } catch (err) {
    //console.log(err)
  }
};

// обновление существующего аудио
export function* adminUpdateAudioSaga (action) {
  const id = action.id;
  const audioData = action.audioData;
  const formData = new FormData();
  formData.append('title', audioData.title);
  formData.append('artist', audioData.artist);
  formData.append('description', audioData.description);
  formData.append('imageUrl', audioData.imageUrl);
  formData.append('audio', audioData.audio);
  formData.append('category', audioData.category);
  try {
    yield axios.put(`/admin/audios/${id}`, formData);
  } catch (err) {
    // console.log(err)
  }
};

// удаление существующего аудио
export function* adminDeleteAudioSaga (action) {
  const id = action.id;
  try {
    yield axios.delete(`/admin/audios/${id}`);
  } catch (err) {
    // console.log(err)
  }
};
