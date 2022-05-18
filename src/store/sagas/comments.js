import { put } from 'redux-saga/effects';

import axios from "../../axiosInstances/axiosInstanceAuth";
import { 
  setComment,
  setUpdatedComment,
  removeDeletedComment
} from '../actions/index';

// отправка нового комментария
export function* postCommentSaga (action) {
  try {
    const response = yield axios.post(`/audios/${action.audioId}/comments`, {
      comment: action.comment
    });
    const newComment = response.data.comment;
    yield put(setComment(newComment));
  }
  catch(error) {
    // console.log(error)
  }
};

// обновление комментария
export function* updateCommentSaga (action) {
  try {
    const response = yield axios.patch(`/audios/${action.audioId}/comments/${action.commentId}`, {
      comment: action.comment
    });
    const updatedComment = response.data.comment;
    yield put(setUpdatedComment(updatedComment));
  }
  catch(error) {
    // console.log(error)
  }
};

// удаление комментария
export function* deleteCommentSaga (action) {
  try {
    const response = yield axios.delete(`/audios/${action.audioId}/comments/${action.commentId}`);
    yield put(removeDeletedComment(response.data.commentId));
  }
  catch(error) {
    // console.log(error)
  }
};