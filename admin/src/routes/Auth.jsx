import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "../components/auth/Login";

function AuthRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default AuthRouter
