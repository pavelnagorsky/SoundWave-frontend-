import * as actionTypes from './actionTypes';

// добавить новый комментарий на сервер
export const postComment = (audioId, commentText) => {
  return {
    type: actionTypes.POST_COMMENT,
    comment: commentText,
    audioId: audioId
  }
};

// добавить полученный с сервера комментарий в стэйт
export const setComment = comment => {
  return {
    type: actionTypes.SET_COMMENT,
    comment: comment
  }
};

// отправить отредактированный комментарий на сервер
export const updateComment = (audioId, commentId, commentText) => {
  return {
    type: actionTypes.UPDATE_COMMENT,
    comment: commentText,
    commentId: commentId,
    audioId: audioId
  }
};

// добавить полученный с сервера обновленный комментарий в стэйт
export const setUpdatedComment = comment => {
  return {
    type: actionTypes.SET_UPDATED_COMMENT,
    comment: comment
  }
};

// удаление комментария на сервере
export const deleteComment = (audioId, commentId) => {
  return {
    type: actionTypes.DELETE_COMMENT,
    commentId: commentId,
    audioId: audioId
  }
};

// удаление комментария из стэйта
export const removeDeletedComment = commentId => {
  return {
    type: actionTypes.REMOVE_DELETED_COMMENT,
    commentId: commentId
  }
};

