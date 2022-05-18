import React from 'react';
import { useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, Routes, useLocation } from "react-router-dom";

import UserProfile from './UserProfile/UserProfile';
import AdminPage from './AdminPage/AdminPage';
import EditAudio from './AdminPage/EditAudio';
import UserSettings from './UserSettings';
import Playlist from './UserProfile/Playlist';

const ProfileHeader = () => {
  const isAdmin = useSelector(state => state.user.isAdmin);
  const location = useLocation();

  let profilePageNav = (
    <Nav
      justify
      variant="tabs" 
      className="mb-3"
    >
      {isAdmin ? (<Nav.Item>
        <LinkContainer to='/profile/admin'>
          <Nav.Link active={location.pathname === '/admin'}>
            Admin
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>) : null}
      <Nav.Item>
        <LinkContainer to='/profile'>
          <Nav.Link active={location.pathname === '/profile'}>
            Profile
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to='/profile/settings'>
          <Nav.Link active={location.pathname === '/profile/settings'}>
            Settings
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  );

  let routes = (
    <Routes>
      <Route path="/" element={<UserProfile />} />
      <Route path='/playlist/:playlistId' element={<Playlist />} />
      <Route path='/settings' element={<UserSettings />} />
    </Routes>
  );

  // если пользователь администратор
  if (isAdmin) {
    routes = (
      <Routes>
        <Route path="/" element={<UserProfile />} />
        <Route path='/playlist/:playlistId' element={<Playlist />} />
        <Route path='/admin' element={<AdminPage/>} />
        <Route path='/admin/audio' element={<EditAudio />} />
        <Route path='/settings' element={<UserSettings />} />
      </Routes>
    );
  };

  return (
    <div className='container-xl p-0' style={{ maxWidth: '1000px' }}>
      {profilePageNav}
      {routes}
    </div>
  )
};

export default ProfileHeader;