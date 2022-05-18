import { put } from 'redux-saga/effects';

import axios from "../../axiosInstances/axiosInstanceAuth";
import {
  getUserDataStart,
  getUserDataSuccess,
  getUserDataFail,
  setChangedUserData,
  addPlaylistStart,
  addPlaylistSuccess,
  addToPlaylistSuccess,
  fetchAudiosStart,
  fetchAudiosFailed,
  setAudios,
  filterPlaylists,
  filterPlaylist,
  filterAudio
} from '../actions/index';

// получение данных авторизированного пользователя
export function* getUserdataSaga (action) {
  const userId = action.userId;
  yield put(getUserDataStart());
  try {
    const response = yield axios.get(`/user/${userId}`);
    const userData = {
      name: response.data.userData.name,
      profileImage: response.data.userData.profileImage,
      isAdmin: response.data.userData.isAdmin,
      likes: response.data.userData.likes,
      playlists: response.data.userData.playlists
    };
    yield put(getUserDataSuccess(userData));
  }
  catch(error) {
    yield put(getUserDataFail());
  }
};

// отправка измененных данных о пользователе (имя и аватарка)
export function* sendUserDataSaga (action) {
  const userId = action.userData.userId;
  // измененные данные пользователя
  const newUserName = action.userData.name;
  const newUserProfileImage = action.userData.profileImage;
  // создание form data
  const formData = new FormData();
  formData.append('newUserName', newUserName);
  formData.append('newUserProfileImage', newUserProfileImage);
  // поставить индикатор загрузки
  yield put(getUserDataStart());
  try {
    // отправка данных на сервер
    const response = yield axios.patch(`/user/${userId}`, formData);
    // обновить данные в стейте
    yield put(setChangedUserData(response.data.updatedName, response.data.updatedProfileImage));
  } catch (err) {
    yield put(getUserDataFail());
  }
};

// добавление нового плейлиста
export function* addPlaylistSaga (action) {
  const userId = action.userId;
  const playlistTitle = action.playlistTitle;
  yield put(addPlaylistStart());
  try {
    const response = yield axios.put(`/user/${userId}/playlists`, {
      playlistTitle: playlistTitle
    });
    yield put(addPlaylistSuccess(response.data.playlist));
  } catch (err) {
    //console.log(err)
  }
};

// добавление аудио в плейлист
export function* addToPlaylistSaga (action) {
  const audioId = action.audioId;
  const userId = action.userId;
  const playlistId = action.playlistId;
  try {
    const response = yield axios.post(`/user/${userId}/playlists/${playlistId}`, {
      audioId: audioId
    });
    yield put(addToPlaylistSuccess(response.data.audioId, response.data.playlistId));
  } catch (err) {
    // console.log(err)
  }
};

// загрузка плейлиста для прослушивания
export function* loadPlaylistSaga (action) {
  const userId = action.userId;
  const playlistId = action.playlistId;
  yield put(fetchAudiosStart());
  try {
    const response = yield axios.get(`/user/${userId}/playlists/${playlistId}`);
    const audios = response.data.audios;
    const totalAudios = response.data.totalAudios;
    yield put(setAudios(audios, totalAudios));
  } catch (error) {
    yield put(fetchAudiosFailed())
  }
};

// удаление плейлиста
export function* deletePlaylistSaga (action) {
  const userId = action.userId;
  const playlistId = action.playlistId;
  try {
    const response = yield axios.delete(`/user/${userId}/playlists/${playlistId}`);
    const deletedPlaylistId = response.data.deletedPlaylistId;
    yield put(filterPlaylists(deletedPlaylistId));
  } catch (err) {
    // console.log(err)
  }
};

// удаление аудио из плейлиста
export function* deleteAudioFromPlaylistSaga (action) {
  const userId = action.userId;
  const playlistId = action.playlistId;
  const audioId = action.audioId;
  try {
    const response = yield axios.patch(`/user/${userId}/playlists/${playlistId}`, {
      audioId: audioId
    });
    const deletedAudioId = response.data.deletedAudioId;
    const editingPlaylistId = response.data.playlistId;
    // удаление аудио из данного плейлиста в стэйте
    yield put(filterPlaylist(editingPlaylistId, deletedAudioId));
    // так как аудиозаписи плейлитса в режиме прослушивания хранятся 
    // в другом redux state (music), необходимо убрать удаленное аудио и оттуда
    yield put(filterAudio(deletedAudioId)); // удаление аудио из массива аудио для прослушливания
  } catch (err) {
    // console.log(err)
  }
};