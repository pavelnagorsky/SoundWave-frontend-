import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { NavDropdown } from 'react-bootstrap';

const dropDownItem = (props) => (
  <LinkContainer to={props.link}>
    <NavDropdown.Item >
      {props.children}
    </NavDropdown.Item>
  </LinkContainer>
);

export default dropDownItem;