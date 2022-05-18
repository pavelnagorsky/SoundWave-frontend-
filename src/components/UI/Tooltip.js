import React from "react";
import { Tooltip } from 'react-bootstrap';

const likeButtonTooltip = props => {
  let isAuth = props.popper.state?.options.isAuth;
  return (
    <Tooltip id='button-tooltip' {...props} className={isAuth ? 'd-none' : ''}  >
      Login to add like
    </Tooltip>
  )
};

export default likeButtonTooltip;