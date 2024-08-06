import React from 'react'
import ROUTES from '../Configs/Routes'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveUserData, showSidebar } from '../Configs/redux/action'
import CONSTANTS from '../Configs/constants'
import { FaLongArrowAltLeft } from 'react-icons/fa'

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(saveUserData({}));
    navigate(ROUTES.SIGNUP);
  }

  return (
    <div>
      <Button className='sidebarToggle' onClick={() => dispatch(showSidebar(!sidebar))}><FaLongArrowAltLeft /></Button>
      <h2 className='siteLogo text-center'>
        <Link to={ROUTES.DASHBOARD}>LOGO</Link>
      </h2>

      <div className='sidebarLinks'>
        {CONSTANTS.MENU?.map((item, id) => {
          return (
            <Link to={item.link} key={id} className={location.pathname === item.link ? 'active' : ''}>{item.label}</Link>
          )
        })}
      </div>

      <Button className='logoutBtn' onClick={() => handleLogout()}>logout</Button>
    </div>
  )
}

export default Sidebar