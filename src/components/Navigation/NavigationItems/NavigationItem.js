import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-bootstrap';

const navigationItem = (props) => (
  <LinkContainer to={props.link}>
    <NavLink >
      {props.children}
    </NavLink>
  </LinkContainer>
);

export default navigationItem;