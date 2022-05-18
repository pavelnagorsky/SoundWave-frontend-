import React from 'react';
import { NavDropdown } from 'react-bootstrap';

import NavigationItem from '../NavigationItems/NavigationItem';
import DropDownItem from '../NavigationItems/DropDownItem';

const contentNavigation = ({ categories }) => {
  const contentNav = (
    <React.Fragment>
      <NavigationItem link="music">
        Home
      </NavigationItem>
      <NavDropdown title="Categories" id="navbarScrollingDropdown" menuVariant='dark'>
        <DropDownItem link="music?sort=Most Listened">Most Listened</DropDownItem>
        <DropDownItem link="music?sort=Top Rated">Top Rated</DropDownItem>
        <NavDropdown.Divider />
        {categories.map(ct => {
          return (<DropDownItem 
            link={`music?sort=${ct.genre}`}
            key={ct._id}
          >
            {ct.genre}
          </DropDownItem>)
        })}
      </NavDropdown>
    </React.Fragment>
  );
  return contentNav;
};

export default contentNavigation;
