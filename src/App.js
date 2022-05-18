import React, { useEffect, Suspense } from 'react';
import { Container } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from "react-router-dom";

import {
  authCheckState,
  fetchCategories,
  getUserData
} from './store/actions/index';
import Header from './containers/Header/Header';
import Footer from './components/Footer';
import MusicPage from './containers/MusicPage/MusicPage';
import SingleAudio from './containers/MusicPage/SingleAudioPage/SingleAudio';
import Signup from './containers/Auth/Signup';
import Login from './containers/Auth/Login';
import Logout from './containers/Auth/Logout';

const App = () => {
  // данные о пользователе
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  const userId = useSelector(state => state.auth.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    // получение данных пользователя
    if (userId) {
      dispatch(getUserData(userId));
    } 
  }, [userId]);

  useEffect(() => {
    // проверка авторизации
    dispatch(authCheckState());
    // получение категорий
    dispatch(fetchCategories());
  }, [])

  const ProfileHeader = React.lazy(() => {
    return import('./containers/UserProfile/ProfileHeader');
  });

  // при наличии токена всеравно рендерим auth компоненты для успешного редиректа с них
  let routes = isAuthenticated ? 
    (
      <Routes>
        <Route path="/" element={<Navigate to="/music" />}/>
        <Route path="/music" element={<MusicPage />}/>
        <Route path="/music/:audioId" element={<SingleAudio />} />
        <Route path="/profile/*" element={<ProfileHeader />}/>
        <Route path="/auth/logout" element={<Logout />}/>
        <Route path="/auth/login" element={<Login />}/>
        <Route path="/auth/signup" element={<Signup />}/>
      </Routes>
    ) :
    (
      <Routes>
        <Route path="/" element={<Navigate to="/music" />}/>
        <Route path="/music" element={<MusicPage />}/>
        <Route path="/music/:audioId" element={<SingleAudio />} />
        <Route path="/auth/login" element={<Login />}/>
        <Route path="/auth/signup" element={<Signup />}/>
      </Routes>
    );

  return (
    <React.Fragment>
      <div className='d-flex flex-column height-100'>
        <div style={{ flex: "1 0 auto", minHeight: "100vh"}}>
        <Header/>
        <Container 
          fluid='lg' 
          className='p-0'
          style={{
            overflowX: 'hidden',
          }}
        >
          <Suspense fallback={<Spinner className='m-auto'/>}>
            {routes}
          </Suspense>
        </Container>
        </div>
        <Footer/>
      </div>
    </React.Fragment>
  );
}

export default App;
