import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ROUTES from '../Configs/Routes';
import { Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa6';
import { showSidebar } from '../Configs/redux/action';

const Header = () => {
  const userData = useSelector((state) => state.formData);
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  return (
    <div className='header'>
      <Button className='sidebarToggle' onClick={() => dispatch(showSidebar(!sidebar))}><FaBars /></Button>

      <h2 className='headerLogo text-center'>
        <Link to={ROUTES.DASHBOARD}>LOGO</Link>
      </h2>

      <div className='d-flex align-items-center gap-2 ms-auto'>
        <img src='/images/profile.png' alt='user' className='userImg' />{userData?.email}
      </div>
    </div>
  )
}

export default Header