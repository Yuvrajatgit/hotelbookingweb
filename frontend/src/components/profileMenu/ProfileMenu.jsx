import React, {useState} from 'react';
import {Avatar, Menu} from '@mantine/core';
import { Link } from 'react-router-dom';

const ProfileMenu = ({user,logout}) => {
   
  return (
    <Menu>
        <Menu.Target>
        <Avatar src={user?.picture} alt='userImage' radius="xl"/> 
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item ><Link to='/favourites'>Favourites</Link></Menu.Item>
          <Menu.Item ><Link to='/bookings'>Bookings</Link></Menu.Item>
          <Menu.Item onClick={()=>{
            localStorage.clear();
            logout()
          }} >Logout</Menu.Item>
        </Menu.Dropdown>
    </Menu>
  )
}

export default ProfileMenu;
