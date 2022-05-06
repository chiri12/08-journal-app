
import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router';

export const PrivateRoute = ( {isAuthenticated }) => {

   
  /*const location = useLocation();
  
  localStorage.setItem('lastPath', location.pathname);*/

  return (
    
    isAuthenticated ? <Outlet /> : <Navigate to='/' /> 
    
  )
}
PrivateRoute.propTypes ={
    isAuthenticated: PropTypes.bool.isRequired,
    
}

