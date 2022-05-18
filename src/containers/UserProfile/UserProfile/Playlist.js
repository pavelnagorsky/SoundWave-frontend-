import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { AiOutlineDelete } from 'react-icons/ai';
import {
  Card, ListGroup,
  Spinner, Button
} from 'react-bootstrap';
import Moment from 'react-moment';

import { usePlayer } from '../../../hooks/usePlayer';
import Player from '../../../components/AudioPlayer/Player';
import Song from '../../../components/Song/Song';
import WithPlaylistsControls from '../../../hoc/WithPlaylistsControls';
import ErrorHandler from '../../../hoc/ErrorHandler';
import {
  loadPlaylist,
  deletePlaylist,
  deleteAudioFromPlaylist,
  setCurrentPlay,
  sendLikeInfo
} from '../../../store/actions/index';

// плейлист пользователя и все его аудио с возможностью прослушивания
const Playlist = () => {
  // навигация
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // режим редактирования плейлиста
  const [editMode, setEditMode] = useState(false);
  // селекторы связанные с загрузкой музыки
  const error = useSelector(state => state.music.error);
  const isLoading = useSelector(state => state.music.loading);
  const audios = useSelector(state => state.music.audios);
  // загруженный плейлист
  const playlistInfo = useSelector(state => state.user.playlists.find(p => (
    p._id === params.playlistId
  )));
  // методы крюка с плеером
  const playerControls = usePlayer(audios);
  // id пользователя сессии
  const userId = useSelector(state => state.auth.userId);
  // селектор информации для плеера
  const currentPlay = useSelector(state => state.player);
  // массив id аудиозаписей, с лайком от данного пользователя
  const userLikes = useSelector(state => state.user.likes);

  useEffect(() => {
    const playlistId = params.playlistId;
    dispatch(loadPlaylist(userId, playlistId));
  }, [params, userId]);

  // при нажатии на кнопку play в ленте аудиозаписей
  const playHandler = audioUrl => {
    // находим трек, на который нажали, он заносится в стейт
    // и отправляется плееру
    const currentAudioIndex = audios.findIndex(song => {
      return song.audioUrl === audioUrl;
    });
    if (currentAudioIndex !== -1) {
      const currentAudio = {
        artist: audios[currentAudioIndex].artist,
        title: audios[currentAudioIndex].title,
        src: audios[currentAudioIndex].audioUrl,
        isPlaying: true,
        index: currentAudioIndex,
        id: audios[currentAudioIndex]._id
      };
      dispatch(setCurrentPlay(currentAudio));
    }
  };

  // на клик по кнопке лайка вызываем action
  // передав ему id аудиозаписи и boоlean значение
  // (лайк был поставлен или убран)
  const likeHandler = (id, hasLike) => {
    let audio = audios.find(audio => audio._id === id);
    if (userId && audio) {
      let add = hasLike ? false : true;
      dispatch(sendLikeInfo(id, add));
    }
  };

  // лайкнута ли данная аудиозапись текущим пользователем
  const isLiked = id => {
    let audio = userLikes.find(audioId => audioId === id);
    if (userId && audio) {
      return true;
    } else {
      return false;
    }
  };

  // переключить режим редактирования плейлиста
  const toogleEditMode = () => {
    setEditMode(!editMode);
  };

  // удалить плейлист
  const onDeletePlaylist = () => {
    dispatch(deletePlaylist(userId, params.playlistId));
    navigate('/profile', {
      replace: true
    })
  };

  // удаление аудио из плейлиста
  const onDeleteAudio = audioId => {
    // запрос на удаление плейлиста из массива плейлистов пользователя
    dispatch(deleteAudioFromPlaylist(userId, params.playlistId, audioId));
  };

  let playlistInfoSection = playlistInfo ? (
    <Card className='border-bottom-0'>
      <Card.Body>
        <Card.Title>{playlistInfo.title}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">
          Created by {playlistInfo.author.name} on {' '}
          <Moment format="D MMM YYYY" withTitle>{playlistInfo.createdAt}</Moment>
        </Card.Subtitle>
        <Button
          variant='outline-secondary'
          size='sm'
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Button
          variant='outline-warning'
          size='sm'
          className='mx-3'
          active={editMode}
          onClick={toogleEditMode}
        >
          Edit
        </Button>
        <Button
          variant='outline-danger'
          size='sm'
          onClick={onDeletePlaylist}
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  ) : null;

  let playlist = (
    <Card style={{ marginBottom: '90px' }}>
      <ListGroup variant="flush" >
        {audios.map(song => (
          <div className='d-flex flex-row align-items-stretch' key={song._id}>
            <div className='flex-grow-1'>
              <Song 
                isAuth={userId ? true : false}
                audio={song} 
                isPlaying={(song.audioUrl === currentPlay.src) && currentPlay.isPlaying}
                onPlay={(audioUrl) => playHandler(audioUrl)}
                key={song._id} 
                id={song._id}
                isLiked={isLiked(song._id)}
                onLike={(id, hasLike) => likeHandler(id, hasLike)}
              />
            </div>
            <Button 
              onClick={() => onDeleteAudio(song._id)}
              className={editMode ? 'border px-1' : 'd-none'}
              variant='outline-danger'
            >
              <AiOutlineDelete fontSize={'20px'}/>
            </Button>
          </div>
        ))}
      </ListGroup>
    </Card>
  );

  if (isLoading) {
    playlist = (
      <div className="text-center mt-4">
        <Spinner animation="border" variant='secondary'/>
      </div>
    )
  };

  if (error) {
    playlist = <div className='ms-3'>Cannot load playlist</div>
  };

  let player = currentPlay.src ? (
    <Player
      isAuth={userId !== null}
      song={currentPlay}
      onSrcLoaded={(id) => playerControls.onSrcLoaded(id)}
      onPrev={playerControls.prev}
      onNext={playerControls.next}
      onClose={playerControls.close}
      onAddToPlaylist={playerControls.addToPlayList}
    />
  ): null;

  return (
    <ErrorHandler error={error}>
      {playlistInfoSection}
      <WithPlaylistsControls 
        show={playerControls.playlistMode}
        hide={playerControls.closePlaylistMode}
        userId={userId}
        audioId={currentPlay.id}
      >
        {playlist}
      </WithPlaylistsControls>
      {player}
    </ErrorHandler>
  )
};

export default Playlist;