import React, { useEffect, useState } from "react";
import UserPage from "../pages/UserPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function AuthRouter() {
    return (
        <Routes>
            <Route path='/login' element={<div>abcdsa</div>}/>
        </Routes>
    )
}

export default AuthRouter
