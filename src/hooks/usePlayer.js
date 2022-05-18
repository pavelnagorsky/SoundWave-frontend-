import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setPrevPlay,
  setNextPlay,
  closePlayer,
  increasePlays
} from '../store/actions/index';

// управление плеером
export const usePlayer = audios => {
  // режим добавления в плейлист
  const [addToPlaylistMode, setAddToPlaylistMode] = useState(false);
  // достигнут ли лимит прослушиваний
  const [listensLimited, setListensLimited] = useState(false);

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.userId !== null);
  const currentPlay = useSelector(state => state.player);

  // переключиться на предыдущий трек в плеере
  const onPlayerPrev = () => {
    const prevAudioIndex = currentPlay.index - 1;
    // переключаться только если предыдущий трек существует
    if (audios[prevAudioIndex] && (prevAudioIndex >= 0)) {
      const prevAudio = audios[prevAudioIndex];
      const playerPrev = {
        id: prevAudio._id,
        artist: prevAudio.artist,
        title: prevAudio.title,
        src: prevAudio.audioUrl,
        isPlaying: true,
        index: prevAudioIndex
      };
      dispatch(setPrevPlay(playerPrev));
    };
  };

  // переключиться на следующий трек в плеере
  const onPlayerNext = () => {
    const nextAudioIndex = currentPlay.index + 1;
    if (audios[nextAudioIndex]) {
      const nextAudio = audios[nextAudioIndex];
      const playerNext = {
        id: nextAudio._id,
        artist: nextAudio.artist,
        title: nextAudio.title,
        src: nextAudio.audioUrl,
        isPlaying: true,
        index: nextAudioIndex
      };
      dispatch(setNextPlay(playerNext));
    };
  };

  // закрыть плеер
  const onPlayerClose = () => {
    dispatch(closePlayer());
  };

  // при загрузке аудио в плеер
  const onSrcLoaded = (id) => {
    // если лимит прослушиваний не исчерпан или пользователь авторизирован,
    // то увеличиваем число прослушиваний на треке
    if (!listensLimited || isAuth) {
      dispatch(increasePlays(id));
    };
    // иначе же ведем подсчет кол-ва прослушиваний через localstorage
    if (!isAuth) {
      let listens = localStorage.getItem('listens');
      if (!listens) {
        return localStorage.setItem('listens', 1);
      };
      if (+listens >= 10) {
        setListensLimited(true);
        dispatch(closePlayer());
        return;
      };
      listens++;
      localStorage.setItem('listens', listens);
    } 
  };

  // включить режим добавление аудио в плейлист
  const addAudioToPlaylist = () => {
    setAddToPlaylistMode(true);
  };

  // закрытие режима добавления аудио в плейлист
  const addAudioToPlaylistClose = () => {
    setAddToPlaylistMode(false);
  };

  return {
    next: onPlayerNext,
    prev: onPlayerPrev,
    close: onPlayerClose,
    onSrcLoaded: onSrcLoaded,
    isLimited: listensLimited,
    setIsLimited: setListensLimited,
    addToPlayList: addAudioToPlaylist,
    playlistMode: addToPlaylistMode,
    closePlaylistMode: addAudioToPlaylistClose
  }
}