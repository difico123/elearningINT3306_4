import React, { Component, useEffect, useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import UserService from '../../service/userService';

const ProtectedRoute = ({auth, children }) => {
  return auth ? children : <Navigate to="/auth/login" />;
};

const ProtectedInstructorRoute = ({ role, children }) => {
  return role === 1 ? children : <Navigate to="/" />;
};

const ProtectedUserRoute = ({ role, children }) => {
  return role === 0 ? children : <Navigate to="/" />;
};

export { ProtectedRoute, ProtectedInstructorRoute, ProtectedUserRoute };
