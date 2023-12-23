import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import {BiMenuAltRight} from 'react-icons/bi';
import {useAuth0} from '@auth0/auth0-react';
import ProfileMenu from '../profileMenu/ProfileMenu';
import AddPropertyModal from '../addPropertyModal/AddPropertyModal';
import useAuthCheck from '../../hooks/useAuthCheck';


const Header = () => {
  const [modalOpen,setModalOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const {validateLogin} = useAuthCheck();
  const {loginWithRedirect, isAuthenticated, logout, user} = useAuth0();
  const handleClick = ()=>{
    setMobileMenu(!mobileMenu);
  }
  const handleAddProperty = ()=>{
   if (validateLogin()){
    setModalOpen(true);
   }
  }

  return (
    <section className='h-wrapper'>
        <div className='flexCenter paddings innerWidth h-container'>
            <Link to='/'>
            <img src='./assets/logo.png' alt='logo' width={100}/>
            </Link>
            <div className='flexCenter h-menu'>
               <NavLink to="/properties">Properties</NavLink>
               <a href='mailto:yuvraj19992@gmail.com'>Contact</a>

              <div onClick={handleAddProperty}>Add Property</div>
              <AddPropertyModal opened={modalOpen}
              setOpened={setModalOpen}/>

               {!isAuthenticated ? (<button className='button' onClick={loginWithRedirect}>
                Login
               </button>) : (<ProfileMenu user={user} logout={logout}/>)}
            </div>
            <div className='menu-icon'>
              <BiMenuAltRight onClick={handleClick} size={30}/>
              {mobileMenu && (<div className='mobile-menu'>
              <NavLink to="/properties">Properties</NavLink>
              <a href='mailto:yuvraj19992@gmail.com'>Contact</a>
              <div className='addpp' onClick={handleAddProperty}>Add Property</div>
              <AddPropertyModal opened={modalOpen}
              setOpened={setModalOpen}/>
              {!isAuthenticated ? (<button className='button' onClick={loginWithRedirect}>
                Login
               </button>) : (<ProfileMenu user={user} logout={logout}/>)}
            </div>)}
            </div>  
        </div>
    </section>
  )
}

export default Header;
