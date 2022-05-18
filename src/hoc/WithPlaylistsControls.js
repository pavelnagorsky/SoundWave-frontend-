import React, { Fragment, useRef, useState } from 'react';
import { 
  Modal, Button, ListGroup,
  InputGroup, FormControl, Collapse,
  Spinner, Badge
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { addToPlaylist, addPlaylist } from '../store/actions/index';

// модальное окно с функционалом добавления аудио в плейлист
const WithPlaylistsControls = ({ userId, audioId, show, hide, children }) => {
  const userPlaylists = useSelector(state => state.user.playlists);
  // индикатор загрузки нового плейлиста
  const playlistLoading = useSelector(state => state.user.playlistLoading);
  // режим создания нового плейлиста
  const [createMode, setCreateMode] = useState(false);
  // ссылка на поле ввода названия нового плейлиста
  const newPlaylistRef = useRef('');
  const dispatch = useDispatch();

  // добавление нового плейлиста
  const onAddNewPlaylst = () => {
    const playlistTitle = newPlaylistRef.current.value.trim();
    if (playlistTitle.length > 0) {
      dispatch(addPlaylist(userId, playlistTitle));
      newPlaylistRef.current.value = '';
      toogleCreateMode();
    }
  };

  // добавление аудио в плейлист
  const onAddToPlaylist = playlistId => {
    dispatch(addToPlaylist(audioId, userId, playlistId));
    // закрытие формы
    hide();
  };

  // переключение режима создания нового плейлиста
  const toogleCreateMode = () => {
    setCreateMode(!createMode);
  };

  const playlistsModal = (
    <Modal
      size="lg"
      aria-labelledby="modal-playlists-vcenter"
      centered
      onHide={hide}
      show={show}
    >
      <Modal.Header closeButton>
        <Modal.Title id="modal-playlists-vcenter">
          Add to playlist
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Choose a playlist or create new</h5>
        <ListGroup className='mb-3 overflow-auto' style={{ maxHeight: '200px' }}>
          {userPlaylists.map(playlist => (
            <ListGroup.Item 
              key={playlist._id} 
              action
              onClick={() => onAddToPlaylist(playlist._id)}
              as='button'
              className='btn btn-primary d-flex justify-content-between align-items-start'
            >
              {playlist.title}
              <Badge bg="primary" pill>
                {playlist.music.length + ' audio'}
              </Badge>
            </ListGroup.Item>
          ))}
          {(userPlaylists.length === 0) 
            ? <div>No playlists yet, create a new one.</div> 
            : null
          }
        </ListGroup>
        <Collapse in={createMode}>
          <InputGroup id="collapse-new-playlist">
            <FormControl
              placeholder='New playlist title'
              aria-label="New playlist title"
              aria-describedby="add-new-playlist"
              ref={newPlaylistRef}
            />
            <Button 
              variant="outline-secondary" 
              id="button-addon1"
              onClick={onAddNewPlaylst}
            >
              Create
            </Button>
          </InputGroup>
        </Collapse>
      </Modal.Body>
      <Modal.Footer >
        <Button 
          onClick={hide}
          variant='outline-danger'
        >
          Close</Button>
        <Button 
          onClick={toogleCreateMode} 
          variant='outline-success'
          aria-controls="collapse-new-playlist"
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
      </Modal.Footer>
    </Modal>
  );

  return (
    <Fragment>
      {playlistsModal}
      {children}
    </Fragment>
  )
};

export default WithPlaylistsControls;