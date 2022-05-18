import React, { useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import * as actions from '../../store/actions/index';

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.logout())
  }, []);

  return <Navigate to='/music' replace/>
}

export default Logout;