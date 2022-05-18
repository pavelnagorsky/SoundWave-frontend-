import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import * as actions from '../../store/actions/index';
import SearchField from '../../components/Navigation/SearchField/SearchField';
import brandLogo from '../../assets/images/brand-logo.jpeg';
import ContentNavigation from '../../components/Navigation/Content-navigation/ContentNavigation';
import ProfileNavigation from '../../components/Navigation/Profile-navigation/ProfileNavigation';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  // данные роутера
  const location = useLocation();
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useSearchParams();
  // данные пользователя
  const userId = useSelector(state => state.auth.userId);
  const profileImage = useSelector(state => state.user.profileImage);
  const isAdmin = useSelector(state => state.user.isAdmin);
  // категории аудио
  const categories = useSelector(state => state.categories.categories);
  // ref на строку поиска
  const searchFormRef = React.createRef();

  // для пагинации результатов поиска
  let page = queryParams.get('page') || 1;
  useEffect(() => {
    if (queryParams.get('search')) {
      const searchQuery = queryParams.get('search');
      dispatch(actions.searchAudio(searchQuery, page));
    }
  }, [page]);

  // функция поиска 
  const onSearch = e => {
    e.preventDefault();
    const searchQuery = searchFormRef.current.value.trim();
    if (searchQuery.length > 0) {
      // если находимся не на странице с музыкой => переход на неё
      if (location.pathname !== '/music') {
        navigate(`/music?search=${searchQuery}`);
      } else {
        setQueryParams({ search: searchQuery });
      }
      dispatch(actions.searchAudio(searchQuery, page));
    }
  }

  return (
    <div style={{ marginBottom: "4.5em" }}>
    <Navbar bg="dark" variant="dark" fixed="top" expand="lg" className='p-0 m-0 shadow' collapseOnSelect>
      <Container fluid='lg' className='py-0'>
        <LinkContainer to='music'>
          <Navbar.Brand >
            <Image src={brandLogo} fluid rounded className='Brand-image'/>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" className='me-3'/>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0" 
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <ContentNavigation categories={categories}/>
          </Nav>  

          <SearchField onSearch={e => onSearch(e)} searchRef={searchFormRef}/>

          <Nav className='ms-xl-5' >
            <ProfileNavigation 
              userId={userId} 
              isAdmin={isAdmin}
              profileImage={
                profileImage !== null ? `https://soundwave-2022.herokuapp.com/${profileImage}` : null
              }
            />
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default Header;