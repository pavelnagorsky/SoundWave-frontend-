import { useState, createRef } from "react"
import { useDispatch } from 'react-redux';

import {
  postComment,
  updateComment,
  deleteComment
} from '../store/actions/index';

export const useComment = (audioId) => {
  // режим редактирования комментария
  const [isEdit, setIsEdit] = useState(false);
  // id редактируемого комментария
  const [editingCommentId, setEditingCommentId] = useState(null);
  const dispatch = useDispatch();
  // ref на textarea для нового комментария
  const newCommentRef = createRef();

  const onPostComment = () => {
    let commentText = newCommentRef.current.value.trim();
    if (commentText.length > 0) {
      if (isEdit) { // если надо обновить комментарий
        dispatch(updateComment(audioId, editingCommentId, commentText));
        setIsEdit(false);
        setEditingCommentId(null);
      } else { // если надо опубликовать новый комментарий
        dispatch(postComment(audioId, commentText));
      };
      newCommentRef.current.value = '';
    }
  };

  const onDeleteComment = commentId => {
    dispatch(deleteComment(audioId, commentId));
  };

  const onEditComment = (commentId, prevText) => {
    setIsEdit(true);
    setEditingCommentId(commentId);
    newCommentRef.current.value = prevText;
    newCommentRef.current.focus();  
  };

  const onCancelEdit = () => {
    setIsEdit(false);
    setEditingCommentId(null);
    newCommentRef.current.value = ''; 
  }

  return {
    isEdit: isEdit,
    onPost: onPostComment,
    onEdit: onEditComment,
    onCancelEdit: onCancelEdit,
    onDelete: onDeleteComment,
    newCommentRef: newCommentRef
  }
};