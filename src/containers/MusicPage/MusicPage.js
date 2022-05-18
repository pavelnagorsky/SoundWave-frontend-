import React, { useEffect } from 'react';
import { Card, ListGroup, Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchAudios,
  setCurrentPlay,
  sendLikeInfo
} from '../../store/actions/index';
import SlideShow from '../../components/SlideShow/SlideShow';
import Song from '../../components/Song/Song';
import CategoryList from '../../components/CategoryList';
import { usePlayer } from '../../hooks/usePlayer';
import Player from '../../components/AudioPlayer/Player';
import WithPagination from '../../hoc/WithPagination';
import WithPlaylistsControls from '../../hoc/WithPlaylistsControls';
import ErrorHandler from '../../hoc/ErrorHandler';
import WithLimitation from '../../hoc/WithLimitation';

// главная страница с музыкой
const MusicPage = () => {
  // qery params
  const [queryParams, setQueryParams] = useSearchParams();
  // селекторы связанные с загрузкой музыки
  const error = useSelector(state => state.music.error);
  const isLoading = useSelector(state => state.music.loading);
  const audios = useSelector(state => state.music.audios);
  // методы крюка с плеером
  const playerControls = usePlayer(audios);
  // id пользователя сессии
  const userId = useSelector(state => state.auth.userId);
  // селектор информации для плеера
  const currentPlay = useSelector(state => state.player);
  // массив id аудиозаписей, с лайком от данного пользователя
  const userLikes = useSelector(state => state.user.likes);
  // массив жанров
  const categories = useSelector(state => state.categories.categories);

  const dispatch = useDispatch();

  // загрузка аудио с сервера
  useEffect(() => {
    // формирование строки запроса через query params
    let pageParam = queryParams.get('page');
    let searchQuery = queryParams.get('search');
    // для search существует свой запрос, так что работаем только с sortQuery
    if (!searchQuery) {
      let sortQuery = queryParams.get('sort');
      let getUrl; // строка запроса
      if (sortQuery) {
        getUrl = `?sort=${sortQuery}&page=${pageParam || 1}`;
      } else {
        getUrl = `?page=${pageParam || 1}`
      };
      dispatch(fetchAudios(getUrl));
    };
  }, [queryParams]);

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

  let musicPage = (
    <Card>
      <ListGroup variant="flush" >
        {audios.map(song => (
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
        ))}
      </ListGroup>
      {audios.length === 0 
        ? <div className='ms-3'>No audios were found</div>
        : null
      }
    </Card>
  );

  if (isLoading) {
    musicPage = (
      <div className="text-center mt-4">
        <Spinner animation="border" variant='secondary'/>
      </div>
    )
  };

  if (error) {
    musicPage = <div className='ms-3'>Cannot load audios</div>
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

  // функция для перехода к выборке по жанру
  const navigateToGenre = queryParam => {
    setQueryParams(
      { sort: queryParam }, 
      { replace: true }
    );
  };

  let categoryTitle = 'Category: ' + (queryParams.get('sort') || 'All');
  if (queryParams.get('search')) {
    categoryTitle = 'Search: ' + queryParams.get('search');
  }; 

  return (
    <ErrorHandler error={error}>
      <SlideShow />
      <div className='row justify-content-center pt-1' >
        <div 
          className='col-lg-7 position-relative' 
          style={{ zIndex: '0' }}
        >
          <div className='m-2 fs-5 ms-3 ms-xl-2'>
            {categoryTitle}
          </div>
          <WithLimitation 
            isLimited={playerControls.isLimited} 
            setIsLimited={playerControls.setIsLimited}
          >
            <WithPlaylistsControls 
              show={playerControls.playlistMode}
              hide={playerControls.closePlaylistMode}
              userId={userId}
              audioId={currentPlay.id}
            >
              <WithPagination>
                {musicPage}
              </WithPagination>
            </WithPlaylistsControls>
          </WithLimitation>
        </div>
        <div className='col-3 d-none d-lg-block'>
          <div className='m-2 fs-5 ms-xl-5'>Genres:</div>
          <CategoryList 
            categories={categories}
            activeGenre={queryParams.get('sort')}
            navigate={(queryParam) => navigateToGenre(queryParam)}
          />
        </div>
      </div>
      {player}
    </ErrorHandler>
  );
};

export default MusicPage;