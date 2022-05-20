import React from 'react';
import { CloseButton } from 'react-bootstrap';
import ReactPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { MdOutlinePlaylistAdd } from 'react-icons/md';

import './Player.css';

const player = ({ isAuth, song, onPrev, onNext, onClose, onSrcLoaded, onAddToPlaylist }) => {
  const header = (song.src !== "") ? (
    <div 
      className="song text-secondary text-center pt-2 px-0"
      style={{ fontWeight: 500 }}
    >
      <span>{song.artist} </span>
      - 
      <span> {song.title}</span>
      <CloseButton 
        onClick={onClose}
        className='position-absolute close-button'
      />
    </div>
  ): null;
  return (
    <ReactPlayer 
      className='player'
      onLoadStart={() => onSrcLoaded(song.id)}
      autoPlay
      volume={0.5}
      header={header}
      onClickPrevious={onPrev}
      onClickNext={onNext}
      onEnded={onNext}
      src={"https://soundwave-2022.herokuapp.com/" + song.src}
      showSkipControls
      showJumpControls={false}
      customAdditionalControls={[
        'LOOP',
        <button
          className={isAuth ? 'p-0 add-button' : 'd-none'}
          onClick={onAddToPlaylist}
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            height: "26px",
            width: "26px"
          }}
        >
          <MdOutlinePlaylistAdd 
            className='h-100 w-100'
          />
        </button>
      ]}
    />
  )
};

export default player;