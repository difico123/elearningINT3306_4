import React, { useState, useEffect, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import styled from "styled-components";

const ProtectedRoute = ({ auth, children }) => {
  return auth ? children : <Navigate to="/admin/login" />;
};

const ProtectedInstructorRoute = ({ role, children }) => {
  return role === 1 ? children : <Navigate to="/" />;
};

const ProtectedUserRoute = ({ role, children }) => {
  return role === 0 ? children : <Navigate to="/" />;
};

export {
  ProtectedRoute,
  ProtectedInstructorRoute,
  ProtectedUserRoute,
};

const WrapLoader = styled.div`
  height: 90vh;
  width: 100vh;
  > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;