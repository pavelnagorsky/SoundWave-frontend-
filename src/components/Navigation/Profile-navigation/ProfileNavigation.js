import React from "react";
import { ButtonGroup, NavDropdown, Image } from 'react-bootstrap';

import DropDownItem from "../NavigationItems/DropDownItem";
import NavigationItem from "../NavigationItems/NavigationItem";

import { BiUserCircle } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { AiOutlineCrown } from 'react-icons/ai';

const profileNavigation = ({ userId, isAdmin, profileImage }) => {
  let profileNav = (
    <ButtonGroup size="sm" className='justify-content-center pb-2 pb-lg-0'>
      <NavigationItem link="auth/login">
        Login
      </NavigationItem>
      <NavigationItem link="auth/signup">
        Sign Up
      </NavigationItem>
    </ButtonGroup>  
  );

  if ( userId ) {
    profileNav = (
      <NavDropdown 
        className='pb-2 pb-lg-0'
        menuVariant='dark'
        title={
          <span>
            <Image 
              src={profileImage ? profileImage : ''} 
              className='Profile-img'
              roundedCircle
              fluid 
            />
            My Profile
          </span>
        } 
      >
        {isAdmin ? (<DropDownItem link="profile/admin">
          <AiOutlineCrown className='Icon'/> 
          Admin
        </DropDownItem>) : null}
        <DropDownItem link="profile">
          <BiUserCircle className='Icon'/> 
          Profile
        </DropDownItem>
        <DropDownItem link="profile/settings">
          <BsGear className='Icon'/>
          Settings
        </DropDownItem>
        <NavDropdown.Divider />
        <DropDownItem link="auth/logout">
          <BiLogOut className='Icon'/>
          Logout
        </DropDownItem>
      </NavDropdown>
    )
  };

  return profileNav;

}

export default profileNavigation;