
import React, { Component } from 'react'
import {Navigate} from 'react-router-dom';
  
const ProtectedLoginRoute  = ({auth,children}) => {
    return !auth ? children : <Navigate to='/home' />;
}

export default ProtectedLoginRoute;