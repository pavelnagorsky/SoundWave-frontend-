import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaSoundcloud,
  FaInstagramSquare
} from 'react-icons/fa';
import { LinkContainer } from "react-router-bootstrap";

const footer = () => (
  <div 
    className='bg-dark text-white-50 overflow-hidden fw-light mt-5'
    style={{ flex: "0 0 auto" }}
  >
    <div 
      className="d-flex flex-column flex-md-row justify-content-evenly align-items-center my-2"
      style={{
        height: "85px",
        lineHeight: "22px",
        fontSize: "15px"
      }}
    >
      <LinkContainer to='/music'>
        <a className="nav-link text-white-50" href="#">
          SoundWave © 2022
        </a>
      </LinkContainer>
      <div>
        All Rights Reserved. Created by Pavel Nagorsky. 
      </div>
      <div className="fs-6">
        <a href="#" className="mx-1 text-white-50">
          <FaFacebookF />
        </a>
        <a href="#" className="mx-1 text-white-50">
          <FaTwitter />
        </a>
        <a href="#" className="mx-1 text-white-50">
          <FaSoundcloud />
        </a>
        <a href="#" className="mx-1 text-white-50">
          <FaInstagramSquare />
        </a>
      </div>
    </div>
  </div>
);

export default footer;