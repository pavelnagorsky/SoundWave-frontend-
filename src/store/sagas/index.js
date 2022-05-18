import { takeEvery, takeLatest, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { 
  fetchAudiosSaga,
  fetchAudioSaga,
  sendLikeInfoSaga,
  searchAudioSaga,
  increasePlaysSaga,
  downloadAudioSaga
} from './music';
import { 
  signupUserSaga, 
  loginUserSaga, 
  logoutSaga,
  checkAuthTimeoutSaga,
  authCheckStateSaga
} from './auth';
import { 
  getUserdataSaga,
  sendUserDataSaga,
  addPlaylistSaga,
  addToPlaylistSaga,
  loadPlaylistSaga,
  deletePlaylistSaga,
  deleteAudioFromPlaylistSaga
} from './user';
import { 
  getCategoriesSaga,
  createCategorySaga,
  updateCategorySaga,
  deleteCategorySaga
} from './category';
import { 
  postCommentSaga,
  updateCommentSaga,
  deleteCommentSaga
} from './comments';
import {
  adminGetUsersSaga,
  adminBlockUserSaga,
  adminRaiseUserSaga,
  adminNewAudioSaga,
  adminUpdateAudioSaga,
  adminDeleteAudioSaga
} from './admin';

export function* watchMusic() {
  yield all([
    takeEvery(actionTypes.FETCH_AUDIOS, fetchAudiosSaga),
    takeEvery(actionTypes.FETCH_AUDIO, fetchAudioSaga),
    takeEvery(actionTypes.SEND_LIKE_INFO, sendLikeInfoSaga),
    takeLatest(actionTypes.AUDIO_SEARCH, searchAudioSaga),
    takeEvery(actionTypes.INCREASE_PLAYS, increasePlaysSaga),
    takeEvery(actionTypes.DOWNLOAD_AUDIO, downloadAudioSaga)
  ])
};

export function* watchComments() {
  yield all([
    takeEvery(actionTypes.POST_COMMENT, postCommentSaga),
    takeEvery(actionTypes.UPDATE_COMMENT, updateCommentSaga),
    takeEvery(actionTypes.DELETE_COMMENT, deleteCommentSaga)
  ]);
};

export function* watchCategory() {
  yield all([
    takeEvery(actionTypes.CATEGORIES_FETCH, getCategoriesSaga),
    takeEvery(actionTypes.CATEGORIES_CREATE, createCategorySaga),
    takeEvery(actionTypes.CATEGORIES_UPDATE, updateCategorySaga),
    takeEvery(actionTypes.CATEGORIES_DELETE, deleteCategorySaga)
  ]);
};

export function* watchAuth() {
  yield all([
    takeLatest(actionTypes.SIGNUP_USER, signupUserSaga),
    takeEvery(actionTypes.LOGIN_USER, loginUserSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
};

export function* watchUser() {
  yield all([
    takeEvery(actionTypes.USER_GET_DATA, getUserdataSaga),
    takeEvery(actionTypes.USER_SEND_DATA, sendUserDataSaga),
    takeEvery(actionTypes.USER_ADD_PLAYLIST, addPlaylistSaga),
    takeEvery(actionTypes.USER_ADD_AUDIO_TO_PLAYLIST, addToPlaylistSaga),
    takeEvery(actionTypes.USER_LOAD_PLAYLIST, loadPlaylistSaga),
    takeEvery(actionTypes.USER_DELETE_PLAYLIST, deletePlaylistSaga),
    takeEvery(actionTypes.USER_DELETE_AUDIO_FROM_PLAYLIST, deleteAudioFromPlaylistSaga)
  ]);
};

export function* watchAdmin() {
  yield all([
    takeEvery(actionTypes.ADMIN_GET_USERS, adminGetUsersSaga),
    takeEvery(actionTypes.ADMIN_BLOCK_USER, adminBlockUserSaga),
    takeEvery(actionTypes.ADMIN_RAISE_USER, adminRaiseUserSaga),
    takeEvery(actionTypes.ADMIN_NEW_AUDIO, adminNewAudioSaga),
    takeEvery(actionTypes.ADMIN_EDIT_AUDIO, adminUpdateAudioSaga),
    takeEvery(actionTypes.ADMIN_DELETE_AUDIO, adminDeleteAudioSaga)
  ]);
};