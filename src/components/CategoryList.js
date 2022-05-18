import React from "react";
import { ListGroup } from 'react-bootstrap';

// список жанров для главной страницы с музыкой 
const categoryList = ({ categories, activeGenre, navigate }) => {
  const genresList = <ListGroup className='ms-xl-5'>
    {categories.map(c => (
      <ListGroup.Item 
        action 
        variant={(activeGenre === c.genre) ? 'dark' : ''}
        onClick={() => navigate(c.genre)}
        key={c._id}
      >
        {c.genre}
      </ListGroup.Item>
    ))}
  </ListGroup>
  return genresList;
};

export default React.memo(categoryList);