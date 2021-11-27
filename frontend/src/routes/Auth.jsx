import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import ForgotPassword from "../components/auth/ForgotPassword";

function AuthRouter() {
    return (
        <Routes>
            <Route path="/login" element={ <Login />} />
            <Route path="/signup" element={ <Signup />} />
            <Route path="/recover" element={ <ForgotPassword />} />
        </Routes>
    )
}

export default AuthRouter
