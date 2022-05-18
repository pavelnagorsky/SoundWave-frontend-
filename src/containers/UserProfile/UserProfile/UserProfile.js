import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Card, Button, Badge, 
  FormControl, InputGroup, Spinner
} from 'react-bootstrap';
import Moment from 'react-moment';

import {
  addPlaylist
} from '../../../store/actions/index';
import ErrorHandler from '../../../hoc/ErrorHandler';

const UserProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  // ссылка на поле ввода названия нового плейлиста
  const newPlaylistRef = useRef('');
  // индикатор загрузки иформации о пользователе
  const userDataLoading = useSelector(state => state.user.loading);
  const dataLoadingError = useSelector(state => state.user.error);
  // индикатор загрузки нового плейлиста
  const playlistLoading = useSelector(state => state.user.playlistLoading);
  // массив плейлистов пользователя
  const playlists = useSelector(state => state.user.playlists);
  // данные о пользователе
  const username = useSelector(state => state.user.name);
  const userId = useSelector(state => state.auth.userId);

  // переход на страницу плейлиста для его прослушивания
  const onLoadPlaylist = playlistId => {
    navigate(`playlist/${playlistId}`);
  };

  // создание нового плейлиста
  const createNewPlaylist = () => {
    const playlistTitle = newPlaylistRef.current.value.trim();
    if (playlistTitle.length > 0) {
      dispatch(addPlaylist(userId, playlistTitle));
      newPlaylistRef.current.value = '';
    }
  }

  const userSection = (
    <div className='p-4 border mx-auto bg-info bg-gradient bg-opacity-10'>
      <div className='display-6'>Hello, {username}!</div>
      <div className='fs-5 display-6'>Explore your playlists and have fun</div>
    </div>
  );

  // поле создания нового плейлиста
  const newPlaylistInput = (
    <InputGroup className="mb-3">
      <FormControl
        placeholder='New playlist title'
        aria-label="New playlist title"
        aria-describedby="button-addon2"
        ref={newPlaylistRef}
      />
      <Button 
        variant="outline-secondary" 
        id="button-addon2"
        onClick={createNewPlaylist}
      >
        Add new
        <Spinner 
          className={playlistLoading ? 'ms-2' : 'd-none'}
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </Button>
    </InputGroup>
  );

  const playlistsSection = playlists.map(playlist => (
    <div 
      className='col-md-6' 
      key={playlist._id}
    >
      <Card className='my-1'>
        <Card.Body>
          <Card.Title className='d-flex flex-row'>
            <div className='flex-grow-1'>
              {playlist.title}
            </div> 
            <Badge pill bg="primary">
              {playlist.music.length} audios
            </Badge>
          </Card.Title>
          <Card.Text className='blockquote-footer pt-2'>
            Last update {' '}
            <Moment fromNow>{playlist.updatedAt}</Moment>
          </Card.Text>
          <Button 
            variant="outline-primary" 
            style={{ width: '100px' }}
            onClick={() => onLoadPlaylist(playlist._id)}
          >
            Listen
          </Button>
        </Card.Body>
      </Card>
    </div>
  ));

  return (
    userDataLoading
    ? 
      <div className="text-center mt-4">
        <Spinner animation="border" variant='secondary'/>
      </div>  
    : 
    <ErrorHandler error={dataLoadingError}>
      {userSection}
      <div className='fs-5 px-3 py-1 fw-normal'>Playlists</div>
      {newPlaylistInput}
      <div className='row'>
        {playlistsSection}
      </div>
    </ErrorHandler>
  );
};

export default UserProfile;