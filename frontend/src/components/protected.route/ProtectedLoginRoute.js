import React from "react";
import { Navigate } from "react-router";

const ProtectedLoginRoute = ({ auth, children }) => {
  return !auth ? children : <Navigate to="/home" />;
};

export default ProtectedLoginRoute;
