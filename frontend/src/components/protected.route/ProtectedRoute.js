import React, { Component } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ auth, children }) => {
  return auth ? children : <Navigate to="/login" />;
};
const ProtectedLoginRoute = ({ auth, children }) => {
  return !auth ? children : <Navigate to="/home" />;
};
const ProtectedCourseRoute = ({ auth, children }) => {
  return auth ? children : <Navigate to="/login" />;
};

export { ProtectedRoute, ProtectedLoginRoute, ProtectedCourseRoute };
