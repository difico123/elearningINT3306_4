import React, { Component, useEffect, useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import UserService from '../../service/userService';

const ProtectedRoute = ({auth, children }) => {
  return auth ? children : <Navigate to="/auth/login" />;
};
export { ProtectedRoute };
