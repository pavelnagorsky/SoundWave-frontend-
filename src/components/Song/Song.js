import React from 'react';
import { ListGroupItem, OverlayTrigger } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { 
  AiOutlinePlayCircle, 
  AiOutlinePauseCircle,
  AiOutlineHeart
} from 'react-icons/ai';

import LikeButtonTooltip from '../UI/Tooltip';
import './Song.css';
// delete button style
const btnSvgStyle = {
  padding: 0,
  outline: "none",
  border: "none",
  font: "inherit",
  color: "inherit",
  backgroundColor: "transparent"
};

const Song = ({ isAuth, id, audio, onPlay, isPlaying, isLiked, onLike }) => (
  <ListGroupItem className='d-flex flex-row align-items-center py-1'>
    <button 
      onClick={() => {
        // можем нажать только если еще не включили данное аудио
        if (!isPlaying) {
          onPlay(audio.audioUrl);
        }
      }}
      className='btnSvg'
      style={btnSvgStyle}
    >
      {
        isPlaying ? 
        <AiOutlinePauseCircle className='song-icon active'/> :
        <AiOutlinePlayCircle className='song-icon'/>
      }
    </button>
    <div className="song text-wrap">
      <div style={{ fontWeight: 500 }}>{audio.title}</div> 
      <div className='text-secondary'>{audio.artist}</div>
    </div>
    <div className='text-secondary d-inline align-middle text-nowrap'>
      <LinkContainer to={`/music/${audio._id}`}>
        <button
          className='btnSvg view p-1'
        >
          View
        </button>
      </LinkContainer>
      <span className={`song-likes ${isLiked ? 'active' : ''}`}>
        <OverlayTrigger
          placement="bottom"
          rootClose
          overlay={LikeButtonTooltip}
          trigger="click"
          popperConfig={{isAuth: isAuth}}
        >
          <button 
            onClick={() => onLike(id, isLiked)}
            className='btnSvg ms-2 me-1'
            style={btnSvgStyle}
          >
            <AiOutlineHeart className='like-icon'/>
          </button>
        </OverlayTrigger>
        {audio.likes}
      </span>
    </div>
  </ListGroupItem>
);

export default React.memo(Song);