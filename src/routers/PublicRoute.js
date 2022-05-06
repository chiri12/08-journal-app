import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router';

export const PublicRoute = ( {isAuthenticated }) => {


  return (
      
    isAuthenticated ===false ? <Outlet /> : <Navigate to='/auth/login' /> 

     )
}

PublicRoute.propTypes ={
    isAuthenticated: PropTypes.bool.isRequired,
    
}

