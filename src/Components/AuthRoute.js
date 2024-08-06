import React from 'react';
import { Navigate } from "react-router-dom";
import ROUTES from '../Configs/Routes';

const AuthRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token")
  return isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} /> : children;
}

export default AuthRoute