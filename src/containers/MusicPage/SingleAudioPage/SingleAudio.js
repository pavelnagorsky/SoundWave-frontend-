import React, { Fragment, useEffect } from "react";
import { 
  Image, ListGroup, 
  Spinner, Toast, 
  Button, NavLink
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  AiFillHeart, 
  AiOutlinePlayCircle
} from 'react-icons/ai';
import { LinkContainer } from 'react-router-bootstrap';
import Moment from 'react-moment';

import { 
  fetchAudio,
  downloadAudio,
  clearAudioData,
  adminDeleteAudio,
  adminEditAudioMode
} from '../../../store/actions/index';
import { useComment } from "../../../hooks/useComment";
import ErrorHandler from "../../../hoc/ErrorHandler";

// страница полной информации об аудиозаписи
const SinglePage = () => {
  const { audioId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // данные о пользователе
  const userId = useSelector(state => state.auth.userId);
  const isAdmin = useSelector(state => state.user.isAdmin);
  // данные о аудиозаписи
  const audio = useSelector(state => state.singleAudio.audio);
  const error = useSelector(state => state.singleAudio.error);
  const loading = useSelector(state => state.singleAudio.loading);
  // кастомный хук для управления комментариями
  const commentsControls = useComment(audio ? audio._id : null);

  // получение полных данных об аудио
  useEffect(() => {
    dispatch(fetchAudio(audioId));
    // удаление информации из стэйта после unmount компонента
    return () => dispatch(clearAudioData())
  }, [audioId]);

  // скачивание аудиофайла
  const downloadSingleAudio = (audioId, filename) => {
    dispatch(downloadAudio(audioId, filename));
  };

  // удалить аудио
  const deleteAudio = () => {
    dispatch(adminDeleteAudio(audio._id));
    setTimeout(() => navigate(-1), 1000);
  };

  // изменить аудио
  const editAudio = () => {
    const audioData = {
      _id: audio._id,
      title: audio.title,
      artist: audio.artist,
      imageUrl: audio.imageUrl,
      audioUrl: audio.audioUrl,
      description: audio.description,
      category: audio.category
    };
    dispatch(adminEditAudioMode(audioData));
    navigate('/profile/admin/audio');
  };

  let singleAudioPage = null;
  let commentsSection = null;

  if (audio) {
    singleAudioPage = (
      <div className="row justify-content-center">
        <Image 
          thumbnail 
          style={{maxWidth: '400px', maxHeight: '400px'}} 
          className="col-md-6 p-3 align-self-start" 
          src={audio.imageUrl}
        />
        <div className="col-md-6 text-center">
          <div className="fs-2 display-4 fw-normal pt-3">
            {audio.title}
          </div>
          <div className="fs-5 display-6 fw-normal py-1">
            {audio.artist}
          </div>
          <ListGroup horizontal className="justify-content-center my-2">
            <ListGroup.Item>
              <AiOutlinePlayCircle className="pe-1 fs-4" color="#0d6efd"/>
              {audio.plays}
            </ListGroup.Item>
            <ListGroup.Item>
              <AiFillHeart className="pe-1 fs-4" color="#f44336" />
              {audio.likes}
            </ListGroup.Item>
            <ListGroup.Item>
              <div>{audio.category?.genre || "No genre"}</div>
            </ListGroup.Item>
          </ListGroup>
          <div className="text-start px-2">
            <div className="d-flex align-items-center my-1">
              <div className="lead flex-grow-1">
                Description:
              </div>
              <div className="text-secondary">
                Posted: {' '}
                <Moment format="D MMM YYYY" withTitle>
                  {audio.createdAt}
                </Moment>
              </div>
            </div>
            <div className="fw-light">
              {audio.description}
            </div>
            <Button 
              className="mt-2"
              variant="outline-secondary" 
              size='sm'
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
            <Button 
              className="mt-2 ms-2"
              variant="outline-primary" 
              size='sm'
              onClick={() => downloadSingleAudio(audio._id, `${audio.artist} - ${audio.title} [SoundWave]`)}
            >
              Download
            </Button>
            {isAdmin ?
              <Fragment>
                <Button 
                  className="mt-2 mx-2"
                  variant="outline-warning" 
                  size='sm'
                  onClick={editAudio}
                >
                  Edit
                </Button>
                <Button 
                  className="mt-2"
                  variant="outline-danger" 
                  size='sm'
                  onClick={deleteAudio}
                >
                  Delete
                </Button>
              </Fragment>
              : null
            }
          </div>
        </div>
      </div>
    );

    commentsSection = (
      <ListGroup className="row justify-content-center mx-1 mx-lg-5 my-2">
        <hr />
        <div className="fs-4 display-5 mb-2">Comments</div>
        {userId === null 
          ? <LinkContainer to="/auth/login">
            <NavLink>Login to add comments</NavLink> 
          </LinkContainer>
          : null
        }
        {/* new comment controls */}
        {userId ? (<div className="input-group px-0 mb-2">
          <textarea 
            ref={commentsControls.newCommentRef}
            rows={2} 
            className="form-control border border-secondary" 
            aria-label="new comment"
            placeholder="Add new comment"
          >
  
          </textarea>
          {commentsControls.isEdit ?
            (<button 
              onClick={commentsControls.onCancelEdit}
              className="btn btn-outline-danger input-group-text"
            >
              Cancel
            </button>
            ) : null}
          <button 
            onClick={commentsControls.onPost}
            className="btn btn-outline-secondary input-group-text"
          >
            {commentsControls.isEdit ? 'Update' : 'Post'}
          </button>
        </div>) : null}
            
        {/* all comments */}
        {audio.comments.map(comment => {
          return (
            <Toast 
              key={comment._id}
              className="w-100 my-1 shadow"
              onClose={() => commentsControls.onDelete(comment._id)}
            >
              <Toast.Header 
                closeButton={(userId === comment.author?._id) || isAdmin}
              >
                <Image
                  rounded
                  className="me-2"
                  src={
                    comment.author?.profileImage 
                    ? `https://soundwave-2022.herokuapp.com/${comment.author.profileImage}`
                    : ''
                  } 
                  style={{
                    maxHeight: '30px',
                    maxWidth: '30px'
                  }}
                />
                <strong className="me-auto">{comment.author?.name || 'Deleted User'}</strong>
                <Moment fromNow>{comment.createdAt}</Moment>
                <button 
                  type="button" 
                  className={
                    (userId === comment.author?._id) || isAdmin
                      ? "btn btn-sm btn-outline-secondary ms-2 py-0" 
                      : 'd-none'
                  }
                  onClick={() => commentsControls.onEdit(comment._id, comment.text)}
                >
                  Edit
                </button>
              </Toast.Header>
              <Toast.Body className="pt-0">
                {comment.text}
              </Toast.Body>
            </Toast>
          );
        })}
      </ListGroup>
    );
  };

  if (error) {
    singleAudioPage = (
      <div className="text-center mt-4">
        Failed to load audio
      </div>
    );
    commentsSection = null;
  };

  if (loading) {
    singleAudioPage = (
      <div className="text-center mt-4">
        <Spinner animation="border" variant='secondary'/>
      </div>
    );
    commentsSection = null;
  };
  
  return (
    <ErrorHandler error={error}>
      <div className="mx-lg-auto border py-3 mb-2 shadow px-2" style={{ maxWidth: '1000px'}}>
        {singleAudioPage}
        {commentsSection}
      </div>
    </ErrorHandler>
  );
};

export default SinglePage;

