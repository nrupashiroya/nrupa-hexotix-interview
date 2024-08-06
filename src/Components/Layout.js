import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import ROUTES from '../Configs/Routes'
import { useSelector } from 'react-redux'

const Layout = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const sidebar = useSelector((state) => state.sidebar);

  useEffect(() => {
    if (!token) {
      navigate(ROUTES.SIGNUP);
    }
  }, [token, navigate])

  return (
    <div className='dashboardWrapper'>
      <div className={`sidebar ${sidebar ? 'open' : ''}`}>
        <Sidebar />
      </div>
      <div className='rightWrapper'>
        <Header />
        <div className='outletWrapper'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout