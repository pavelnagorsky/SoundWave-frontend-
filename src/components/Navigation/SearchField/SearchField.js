import React from "react";
import { Button, Form, FormControl } from 'react-bootstrap';

//поле поиска
const searchField = ({ searchRef, onSearch }) => (
  <Form className="d-flex pb-2 pb-lg-0 me-lg-5">
    <FormControl
      ref={searchRef}
      type="search"
      placeholder="Search"
      className="me-2"
      aria-label="Search"
    />
    <Button 
      variant="outline-success"
      type='submit' 
      onClick={onSearch}
    >
      Search
    </Button>
  </Form>
);

export default searchField;


